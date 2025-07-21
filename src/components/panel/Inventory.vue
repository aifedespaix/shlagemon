<script setup lang="ts">
import type { BallId } from '~/data/items/shlageball'
import type { Item } from '~/type/item'
import { toast } from 'vue3-toastify'
import {
  itemCategoryTabBaseColors,
  itemCategoryTabColors,
  itemCategoryTabHoverColors,
} from '~/constants/itemCategory'

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

watch(availableCategories, (cats) => {
  if (!cats.length)
    filter.category = 'all'
  else if (!cats.some(c => c.value === filter.category))
    filter.category = cats[0].value
}, { immediate: true })

const highlightCategories = computed(() => {
  const map = {
    actif: false,
    passif: false,
    utilitaire: false,
  } as Record<typeof categoryOptions[number]['value'], boolean>
  for (const entry of inventory.list) {
    if (!usage.used[entry.item.id] && entry.item.category)
      map[entry.item.category] = true
  }
  return map
})

const categoryTabs = computed(() =>
  availableCategories.value.map(opt => ({
    ...opt,
    highlight: highlightCategories.value[opt.value] && filter.category !== opt.value,
  })),
)

const tabColors = itemCategoryTabBaseColors
const tabHoverColors = itemCategoryTabHoverColors
const tabActiveColors = itemCategoryTabColors
const filteredList = computed(() => {
  let list = inventory.list.slice()
  if (filter.category !== 'all')
    list = list.filter(e => e.item.category === filter.category)
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
      list.sort((a, b) => a.item.price - b.item.price)
      break
  }
  if (!filter.sortAsc)
    list.reverse()
  return list
})

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
  <LayoutScrollablePanel v-if="inventory.list.length">
    <template #header>
      <UiSortControls
        v-model:sort-by="filter.sortBy"
        v-model:sort-asc="filter.sortAsc"
        :options="sortOptions"
      />
      <UiSearchInput v-model="filter.search" class="flex-1" />
      <UiTabBar
        v-if="availableCategories.length > 0"
        v-model="filter.category"
        :options="categoryTabs"
        :colors="tabColors"
        :hover-colors="tabHoverColors"
        :active-colors="tabActiveColors"
        highlight-classes="animate-pulse-alt animate-count-infinite"
        class="w-full -mb-2"
      />
    </template>

    <template #content>
      <InventoryItemCard
        v-for="entry in filteredList"
        :key="entry.item.id"
        :item="entry.item"
        :qty="entry.qty"
        :disabled="isDisabled(entry.item)"
        @use="onUse(entry.item)"
        @sell="inventory.sell(entry.item.id)"
      />
    </template>
  </LayoutScrollablePanel>
  <InventoryEvolutionItemModal />
  <InventoryWearableItemModal />
  <InventoryItemShortcutModal />
  <EggBoxModal />
</template>
