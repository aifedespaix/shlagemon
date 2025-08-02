<script setup lang="ts">
import type { Component } from 'vue'
import type { BallId } from '~/data/items/shlageball'
import type { Item, ItemCategory } from '~/type/item'
import { defineComponent, h } from 'vue'
import { toast } from 'vue3-toastify'
import {
  badgeBox as badgeBoxItem,
  eggBox as eggBoxItem,
  fabulousPotion,
  mysteriousPotion,
  odorElixir,
  specialPotion,
} from '~/data/items'
import { useKingPotionStore } from '~/stores/kingPotion'
import InventoryItemCard from '../inventory/ItemCard.vue'

const inventory = useInventoryStore()
const eggBox = useEggBoxStore()
const badgeBox = useBadgeBoxStore()
const ballStore = useBallStore()
const evoItemStore = useEvolutionItemStore()
const wearableStore = useWearableItemStore()
const kingPotion = useKingPotionStore()
const kingPotionIds = [fabulousPotion.id, mysteriousPotion.id, specialPotion.id]
const odorElixirStore = useOdorElixirStore()
const filter = useInventoryFilterStore()
const featureLock = useFeatureLockStore()
const usage = useItemUsageStore()
const panel = useMainPanelStore()
const battleCooldown = useBattleItemCooldownStore()
const { t } = useI18n()
const sortOptions = [
  { label: t('components.panel.Inventory.sort.type'), value: 'type' },
  { label: t('components.panel.Inventory.sort.name'), value: 'name' },
  { label: t('components.panel.Inventory.sort.price'), value: 'price' },
]
const categoryOptions = [
  { label: t('components.panel.Inventory.category.battle'), value: 'battle', icon: 'i-carbon:crossroads' },
  { label: t('components.panel.Inventory.category.active'), value: 'actif', icon: 'i-carbon-flash' },
  { label: t('components.panel.Inventory.category.passive'), value: 'passif', icon: 'i-carbon-timer' },
  { label: t('components.panel.Inventory.category.utility'), value: 'utilitaire', icon: 'i-carbon-tool-box' },
  { label: t('components.panel.Inventory.category.activable'), value: 'activable', icon: 'i-carbon:touch-1-filled' },
] as const

const isTrainerBattle = computed(() => panel.current === 'trainerBattle')

const availableCategories = computed(() =>
  categoryOptions
    .filter(opt => isTrainerBattle.value
      ? opt.value === 'battle' || inventory.list.some(entry => entry.item.category === opt.value)
      : inventory.list.some(entry => entry.item.category === opt.value))
    .map(opt => ({
      label: {
        text: opt.label,
        icon: opt.icon,
      },
      value: opt.value,
      disabled: isTrainerBattle.value && opt.value !== 'battle',
    })),
)

const activeTab = ref(0)
const categories = computed(() => availableCategories.value)

const newItemCountByCategory = computed(() => {
  const counts: Partial<Record<ItemCategory, number>> = {}
  for (const { item } of inventory.list) {
    if (!usage.used[item.id] && item.category)
      counts[item.category] = (counts[item.category] || 0) + 1
  }
  return counts
})

const tabComponents = new Map<ItemCategory | 'all', Component>()
function getTabComponent(category: ItemCategory | 'all') {
  if (tabComponents.has(category))
    return tabComponents.get(category)!
  const comp = defineComponent({
    name: `InventoryTab_${category}`,
    setup() {
      const list = getList(category)
      return () => h('div', {
        class: 'tiny-scrollbar flex flex-col gap-2 overflow-x-hidden overflow-y-auto p-1',
      }, list.value.map(entry =>
        h(InventoryItemCard, {
          item: entry.item,
          qty: entry.qty,
          disabled: isDisabled(entry.item),
          onUse: () => onUse(entry.item),
          onSell: () => inventory.sell(entry.item.id),
        })))
    },
  })
  tabComponents.set(category, comp)
  return comp
}

const tabs = computed(() =>
  categories.value.map((cat) => {
    const count = newItemCountByCategory.value[cat.value] || 0
    return {
      label: cat.label,
      component: getTabComponent(cat.value),
      highlight: count > 0,
      badge: count,
      disabled: cat.disabled,
    }
  }),
)

watch(() => filter.category, (val) => {
  const idx = categories.value.findIndex(c => c.value === val)
  if (idx !== -1 && idx !== activeTab.value)
    activeTab.value = idx
}, { immediate: true })

watch(activeTab, (val) => {
  const cat = categories.value[val]?.value
  if (cat && cat !== filter.category)
    filter.category = cat
})

watch(availableCategories, (cats) => {
  if (!cats.length)
    filter.category = 'all'
  else if (!cats.some(c => c.value === filter.category))
    filter.category = cats.find(c => !c.disabled)?.value ?? cats[0].value
}, { immediate: true })

watch(isTrainerBattle, (val) => {
  if (val)
    filter.category = 'battle'
}, { immediate: true })

function getList(category: ItemCategory | 'all') {
  return computed(() => {
    let list = inventory.list.slice()
    if (category !== 'all')
      list = list.filter(e => e.item.category === category)
    else if (isTrainerBattle.value)
      list = list.filter(e => e.item.category === 'battle')
    const q = filter.search.toLowerCase().trim()
    if (q) {
      list = list.filter(entry =>
        t(entry.item.name).toLowerCase().includes(q),
      )
    }
    switch (filter.sortBy) {
      case 'type':
        list.sort((a, b) => {
          const typeComp = (a.item.type || '').localeCompare(b.item.type || '')
          if (typeComp !== 0)
            return typeComp
          return (a.item.power || 0) - (b.item.power || 0)
        })
        break
      case 'name':
        list.sort((a, b) =>
          t(a.item.name).localeCompare(t(b.item.name)),
        )
        break
      case 'price':
        list.sort((a, b) => (a.item.price ?? 0) - (b.item.price ?? 0))
        break
    }
    if (!filter.sortAsc)
      list.reverse()
    return list
  })
}
const filteredList = getList('all')

function isDisabled(item: Item) {
  if (featureLock.isInventoryLocked)
    return true
  if (isTrainerBattle.value && item.category !== 'battle')
    return true
  if (item.category === 'battle' && battleCooldown.isActive)
    return true
  if ('catchBonus' in item)
    return ballStore.current === item.id
  if (kingPotionIds.includes(item.id))
    return kingPotion.current === item.id
  return item.type === 'evolution' && !evoItemStore.canUse(item)
}

function onUse(item: Item) {
  if (featureLock.isInventoryLocked)
    return
  if ('catchBonus' in item) {
    ballStore.equip(item.id as BallId)
    usage.markUsed(item.id)
    toast(t('components.panel.Inventory.equip', { item: t(item.name) }))
  }
  else if (kingPotionIds.includes(item.id)) {
    kingPotion.equip(item.id)
    usage.markUsed(item.id)
    toast(t('components.panel.Inventory.equip', { item: t(item.name) }))
  }
  else if (item.type === 'evolution') {
    evoItemStore.open(item)
  }
  else if (item.wearable) {
    wearableStore.open(item)
  }
  else if (item.id === odorElixir.id) {
    odorElixirStore.open(item)
  }
  else if (item.id === eggBoxItem.id) {
    eggBox.open()
    usage.markUsed(item.id)
  }
  else if (item.id === badgeBoxItem.id) {
    badgeBox.open()
    usage.markUsed(item.id)
  }
  else {
    if (inventory.useItem(item.id))
      usage.markUsed(item.id)
  }
}
</script>

<template>
  <section v-if="inventory.list.length" class="h-full w-full flex flex-col gap-2 overflow-hidden">
    <div class="flex flex-wrap gap-1 px-2 pt-1">
      <UiSortControls
        v-model:sort-by="filter.sortBy"
        v-model:sort-asc="filter.sortAsc"
        :options="sortOptions"
      />
      <UiSearchInput v-model="filter.search" class="min-w-22 flex-1" />
    </div>
    <UiTabs
      v-if="availableCategories.length > 0"
      v-model="activeTab"
      is-small
      :tabs="tabs"
      class="flex-1"
      icons-only
    />
    <div
      v-else
      class="tiny-scrollbar flex flex-col gap-2 overflow-x-hidden overflow-y-auto py-1"
    >
      <InventoryItemCard
        v-for="entry in filteredList"
        :key="entry.item.id"
        :item="entry.item"
        :qty="entry.qty"
        :disabled="isDisabled(entry.item)"
        @use="onUse(entry.item)"
        @sell="inventory.sell(entry.item.id)"
      />
    </div>
  </section>
  <InventoryEvolutionItemModal />
  <InventoryWearableItemModal />
  <InventoryOdorElixirModal />
  <InventoryItemShortcutModal />
  <EggBoxModal />
  <BadgeBoxModal />
</template>
