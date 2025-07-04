<script setup lang="ts">
import type { Item } from '~/type/item'
import { computed } from 'vue'
import ItemCard from '~/components/shop/ItemCard.vue'
import Button from '~/components/ui/Button.vue'
import { getShop } from '~/data/shops'
import { useGameStore } from '~/stores/game'
import { useInventoryStore } from '~/stores/inventory'
import { useZoneStore } from '~/stores/zone'

const inventory = useInventoryStore()
const game = useGameStore()
const zone = useZoneStore()
const shopItems = computed(() => getShop(zone.current.id)?.items || [])

function canBuy(item: Item) {
  if (item.currency === 'shlagidiamond')
    return game.shlagidiamond >= item.price
  return game.shlagidolar >= item.price
}
</script>

<template>
  <div class="h-full flex flex-col">
    <h2 class="mb-2 text-center font-bold">
      Boutique
    </h2>
    <div class="flex flex-col gap-2 overflow-auto">
      <ItemCard v-for="item in shopItems" :key="item.id" :item="item">
        <Button class="ml-2" :disabled="!canBuy(item)" @click="inventory.buy(item.id)">
          Acheter
        </Button>
      </ItemCard>
    </div>
  </div>
</template>
