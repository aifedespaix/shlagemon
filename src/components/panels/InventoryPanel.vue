<script setup lang="ts">
import type { Item } from '~/type/item'
import InventoryItemCard from '~/components/inventory/InventoryItemCard.vue'
import { useBallStore } from '~/stores/ball'
import { useInventoryStore } from '~/stores/inventory'

const inventory = useInventoryStore()
const ballStore = useBallStore()

function onUse(item: Item) {
  if ('catchBonus' in item)
    ballStore.setBall(item.id as any)
  else
    inventory.useItem(item.id)
}
</script>

<template>
  <section v-if="inventory.list.length" class="flex flex-col gap-2">
    <InventoryItemCard
      v-for="entry in inventory.list"
      :key="entry.item.id"
      :item="entry.item"
      :qty="entry.qty"
      @use="onUse(entry.item)"
      @sell="inventory.sell(entry.item.id)"
    />
  </section>
</template>
