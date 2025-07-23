<script setup lang="ts">
import type { BallId } from '~/data/items/shlageball'
import type { Item, ItemCategory } from '~/type/item'
import { defineComponent, h } from 'vue'
import { toast } from 'vue3-toastify'

const inventory = useInventoryStore()
const eggBox = useEggBoxStore()
const ballStore = useBallStore()
const evoItemStore = useEvolutionItemStore()
const wearableStore = useWearableItemStore()
const filter = useInventoryFilterStore()
const featureLock = useFeatureLockStore()
const usage = useItemUsageStore()
const { t } = useI18n()
const sortOptions = [
  { label: t('components.panel.Inventory.sort.type'), value: 'type' },
  { label: t('components.panel.Inventory.sort.name'), value: 'name' },
  { label: t('components.panel.Inventory.sort.price'), value: 'price' },
]
const categoryOptions = [
  { label: t('components.panel.Inventory.category.active'), value: 'actif', icon: 'i-carbon-flash' },
  { label: t('components.panel.Inventory.category.passive'), value: 'passif', icon: 'i-carbon-timer' },
  { label: t('components.panel.Inventory.category.utility'), value: 'utilitaire', icon: 'i-carbon-tool-box' },
] as const
const availableCategories = computed(() =>
  categoryOptions.filter(opt =>
    inventory.list.some(entry => entry.item.category === opt.value),
  ),
)

const activeTab = ref(0)
const categories = computed(() => availableCategories.value)

const tabs = computed(() =>
  categories.value.map(cat => ({
    label: cat.label,
    component: defineComponent({
      name: `InventoryTab_${cat.value}`,
      setup() {
        const list = getList(cat.value)
        return () => h('div', {
          class: 'tiny-scrollbar flex flex-col gap-2 overflow-x-hidden overflow-y-auto py-1',
        }, list.value.map(entry =>
          h(InventoryItemCard, {
            item: entry.item,
            qty: entry.qty,
            disabled: isDisabled(entry.item),
            onUse: () => onUse(entry.item),
            onSell: () => inventory.sell(entry.item.id),
          })))
      },
    }),
  })),
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
    filter.category = cats[0].value
}, { immediate: true })

function getList(category: ItemCategory | 'all') {
  return computed(() => {
    let list = inventory.list.slice()
    if (category !== 'all')
      list = list.filter(e => e.item.category === category)
    const q = filter.search.toLowerCase().trim()
    if (q)
      list = list.filter(entry => entry.item.name.toLowerCase().includes(q))
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
        list.sort((a, b) => a.item.name.localeCompare(b.item.name))
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
  if ('catchBonus' in item)
    return ballStore.current === item.id
  return item.type === 'evolution' && !evoItemStore.canUse(item)
}

function onUse(item: Item) {
  if (featureLock.isInventoryLocked)
    return
  if ('catchBonus' in item) {
    ballStore.setBall(item.id as BallId)
    usage.markUsed(item.id)
    toast(t('components.panel.Inventory.equip', { item: item.name }))
  }
  else if (item.type === 'evolution') {
    evoItemStore.open(item)
  }
  else if (item.wearable) {
    wearableStore.open(item)
  }
  else if (item.id === 'egg-box') {
    eggBox.open()
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
    <div class="flex flex-wrap gap-2 px-1">
      <UiSortControls
        v-model:sort-by="filter.sortBy"
        v-model:sort-asc="filter.sortAsc"
        :options="sortOptions"
      />
      <UiSearchInput v-model="filter.search" class="flex-1" />
    </div>
    <UiTabs
      v-if="availableCategories.length > 0"
      v-model="activeTab"
      :tabs="tabs"
      class="flex-1"
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
  <InventoryItemShortcutModal />
  <EggBoxModal />
</template>
