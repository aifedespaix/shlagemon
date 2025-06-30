<script setup lang="ts">
import ItemCard from '~/components/shop/ItemCard.vue'
import Button from '~/components/ui/Button.vue'
import { useInventoryStore } from '~/stores/inventory'

const inventory = useInventoryStore()
</script>

<template>
  <section v-if="inventory.list.length" class="flex flex-col gap-2">
    <h2 class="mb-2 font-bold">
      Inventaire
    </h2>
    <ItemCard
      v-for="entry in inventory.list"
      :key="entry.item.id"
      :item="entry.item"
    >
      <div class="flex items-center gap-1">
        <span class="font-bold">x{{ entry.qty }}</span>
        <Button class="text-xs" @click="inventory.useItem(entry.item.id)">
          Utiliser
        </Button>
        <Button
          type="danger"
          class="text-xs"
          @click="inventory.sell(entry.item.id)"
        >
          Vendre
        </Button>
      </div>
    </ItemCard>
  </section>
</template>
