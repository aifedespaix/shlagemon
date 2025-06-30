<script setup lang="ts">
import ItemCard from '~/components/shop/ItemCard.vue'
import Button from '~/components/ui/Button.vue'
import { shopItems } from '~/data/items'
import { useInventoryStore } from '~/stores/inventory'

const emit = defineEmits(['close'])
const inventory = useInventoryStore()
const tab = ref<'shop' | 'inventory'>('shop')
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-2 flex justify-center gap-2">
      <button class="rounded px-2 py-1" :class="tab === 'shop' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'" @click="tab = 'shop'">
        Boutique
      </button>
      <button class="rounded px-2 py-1" :class="tab === 'inventory' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'" @click="tab = 'inventory'">
        Inventaire
      </button>
    </div>
    <div class="flex flex-col gap-2 overflow-auto">
      <template v-if="tab === 'shop'">
        <ItemCard v-for="item in shopItems" :key="item.id" :item="item">
          <Button class="ml-2" @click="inventory.buy(item.id)">
            Acheter
          </Button>
        </ItemCard>
      </template>
      <template v-else>
        <ItemCard v-for="entry in inventory.list" :key="entry.item.id" :item="entry.item">
          <div class="flex items-center gap-1">
            <span class="font-bold">x{{ entry.qty }}</span>
            <Button class="text-xs" @click="inventory.remove(entry.item.id)">
              Utiliser
            </Button>
            <Button type="danger" class="text-xs" @click="inventory.sell(entry.item.id)">
              Vendre
            </Button>
          </div>
        </ItemCard>
      </template>
    </div>
    <div class="mt-2 text-right">
      <Button class="text-xs" @click="emit('close')">
        Fermer
      </Button>
    </div>
  </div>
</template>
