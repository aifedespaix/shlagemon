<script setup lang="ts">
import type { Item } from '~/type/item'
import { toast } from 'vue3-toastify'
import EvolutionItemModal from '~/components/inventory/EvolutionItemModal.vue'
import InventoryItemCard from '~/components/inventory/InventoryItemCard.vue'
import MultiExpModal from '~/components/inventory/MultiExpModal.vue'
import SearchInput from '~/components/ui/SearchInput.vue'
import SortControls from '~/components/ui/SortControls.vue'
import { useBallStore } from '~/stores/ball'
import { useEvolutionItemStore } from '~/stores/evolutionItem'
import { useInventoryStore } from '~/stores/inventory'
import { useInventoryFilterStore } from '~/stores/inventoryFilter'
import { useMultiExpStore } from '~/stores/multiExp'

const inventory = useInventoryStore()
const ballStore = useBallStore()
const evoItemStore = useEvolutionItemStore()
const multiExpStore = useMultiExpStore()
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
  else if (item.id === 'multi-exp') {
    multiExpStore.open()
  }
  else {
    inventory.useItem(item.id)
  }
}
</script>

<template>
  <section v-if="inventory.list.length" class="h-full flex flex-col gap-2">
    <div class="flex flex-wrap gap-2">
      <SortControls
        v-model:sort-by="filter.sortBy"
        v-model:sort-asc="filter.sortAsc"
        :options="sortOptions"
      />
      <SearchInput v-model="filter.search" class="flex-1" />
    </div>
    <div class="flex flex-col gap-2 overflow-auto">
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
  <EvolutionItemModal />
  <MultiExpModal />
</template>
