<script setup lang="ts">
import ItemCard from '~/components/shop/ItemCard.vue'
import Button from '~/components/ui/Button.vue'
import { shopItems } from '~/data/items'
import { useInventoryStore } from '~/stores/inventory'

const inventory = useInventoryStore()
</script>

<template>
  <div class="h-full flex flex-col">
    <h2 class="mb-2 text-center font-bold">
      Boutique
    </h2>
    <div class="flex flex-col gap-2 overflow-auto">
      <ItemCard v-for="item in shopItems" :key="item.id" :item="item">
        <Button class="ml-2" @click="inventory.buy(item.id)">
          Acheter
        </Button>
      </ItemCard>
    </div>
  </div>
</template>
