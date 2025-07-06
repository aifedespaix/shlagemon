<script setup lang="ts">
import type { Item } from '~/type/item'
import { toast } from 'vue3-toastify'
import EvolutionItemModal from '~/components/inventory/EvolutionItemModal.vue'
import InventoryItemCard from '~/components/inventory/InventoryItemCard.vue'
import MultiExpModal from '~/components/inventory/MultiExpModal.vue'
import SearchInput from '~/components/ui/SearchInput.vue'
import { useBallStore } from '~/stores/ball'
import { useEvolutionItemStore } from '~/stores/evolutionItem'
import { useInventoryStore } from '~/stores/inventory'
import { useMultiExpStore } from '~/stores/multiExp'

const inventory = useInventoryStore()
const ballStore = useBallStore()
const evoItemStore = useEvolutionItemStore()
const multiExpStore = useMultiExpStore()
const search = ref('')
const filteredList = computed(() => {
  const q = search.value.toLowerCase().trim()
  if (!q)
    return inventory.list
  return inventory.list.filter(entry => entry.item.name.toLowerCase().includes(q))
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
    <SearchInput v-model="search" class="w-full" />
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
