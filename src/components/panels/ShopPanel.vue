<script setup lang="ts">
import type { Item } from '~/type/item'
import { computed, ref } from 'vue'
import ItemCard from '~/components/shop/ItemCard.vue'
import ShopItemDetail from '~/components/shop/ShopItemDetail.vue'
import Button from '~/components/ui/Button.vue'
import { getShop } from '~/data/shops'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useZoneStore } from '~/stores/zone'

const panel = useMainPanelStore()
const zone = useZoneStore()
const shopItems = computed(() => getShop(zone.current.id)?.items || [])
const selectedItem = ref<Item | null>(null)

function closeShop() {
  panel.showVillage()
}
</script>

<template>
  <div class="h-full flex flex-col -m-4">
    <h2 class="mb-2 text-center font-bold">
      Boutique
    </h2>
    <div v-if="!selectedItem" class="flex flex-col gap-2 overflow-auto">
      <ItemCard
        v-for="item in shopItems"
        :key="item.id"
        :item="item"
        class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
        @click="selectedItem = item"
      >
        <Button class="ml-auto text-xs" @click.stop="selectedItem = item">
          Détails
        </Button>
      </ItemCard>
    </div>
    <div v-else class="flex-1 overflow-auto">
      <ShopItemDetail :item="selectedItem" @close="selectedItem = null" />
    </div>
    <Button type="danger" class="mt-2 flex self-center gap-2" @click="closeShop">
      <div class="i-carbon:exit" />
      Quitter la boutique
    </Button>
  </div>
</template>
