<script setup lang="ts">
import InventoryItemCard from '~/components/inventory/InventoryItemCard.vue'
import { useInventoryStore } from '~/stores/inventory'

const inventory = useInventoryStore()
</script>

<template>
  <section v-if="inventory.list.length" class="flex flex-col gap-2">
    <InventoryItemCard
      v-for="entry in inventory.list"
      :key="entry.item.id"
      :item="entry.item"
      :qty="entry.qty"
      @use="inventory.useItem(entry.item.id)"
      @sell="inventory.sell(entry.item.id)"
    />
  </section>
</template>
