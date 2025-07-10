<script setup lang="ts">
import type { Item } from '~/type/item'
import { toast } from 'vue3-toastify'
import EvolutionItemModal from '~/components/inventory/EvolutionItemModal.vue'
import InventoryItemCard from '~/components/inventory/InventoryItemCard.vue'
import SearchInput from '~/components/ui/SearchInput.vue'
import SortControls from '~/components/ui/SortControls.vue'
import { useBallStore } from '~/stores/ball'
import { useEvolutionItemStore } from '~/stores/evolutionItem'
import { useInventoryStore } from '~/stores/inventory'
import { useInventoryFilterStore } from '~/stores/inventoryFilter'
import { useInventoryModalStore } from '~/stores/inventoryModal'
import { useWearableItemStore } from '~/stores/wearableItem'

const inventory = useInventoryStore()
const ballStore = useBallStore()
const evoItemStore = useEvolutionItemStore()
const wearableItem = useWearableItemStore()
const inventoryModal = useInventoryModalStore()
const filter = useInventoryFilterStore()
const sortOptions = [
  { label: 'Type', value: 'type' },
  { label: 'Nom', value: 'name' },
  { label: 'Prix', value: 'price' },
]
const filteredList = computed(() => {
  let list = inventory.list.slice()
  const q = filter.search.toLowerCase().trim()
  if (q)
    list = list.filter(entry => entry.item.name.toLowerCase().includes(q))
  switch (filter.sortBy) {
    case 'type':
      list.sort((a, b) => (a.item.type || '').localeCompare(b.item.type || ''))
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
  if ('catchBonus' in item)
    return ballStore.current === item.id
  return item.type === 'evolution' && !evoItemStore.canUse(item)
}

function onUse(item: Item) {
  if ('catchBonus' in item) {
    ballStore.setBall(item.id as any)
    toast(`Vous avez équipé la ${item.name}`)
  }
  else if (item.type === 'evolution') {
    evoItemStore.open(item)
  }
  else if (item.wearable) {
    if (inventoryModal.isVisible)
      inventoryModal.close()
    wearableItem.open(item.id)
  }
  else {
    inventory.useItem(item.id)
  }
}
</script>

<template>
  <ScrollablePanel v-if="inventory.list.length">
    <template #header>
      <SortControls
        v-model:sort-by="filter.sortBy"
        v-model:sort-asc="filter.sortAsc"
        :options="sortOptions"
      />
      <SearchInput v-model="filter.search" class="flex-1" />
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
  </ScrollablePanel>
  <EvolutionItemModal />
  <MultiExpModal />
</template>
