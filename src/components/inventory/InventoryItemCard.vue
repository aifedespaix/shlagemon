<script setup lang="ts">
import type { Item } from '~/type/item'
import Button from '~/components/ui/Button.vue'

const props = defineProps<{ item: Item, qty: number }>()
const emit = defineEmits<{
  (e: 'use'): void
  (e: 'sell'): void
}>()
</script>

<template>
  <div class="flex flex-col gap-1 border rounded bg-white p-2 dark:bg-gray-900">
    <div class="flex items-center gap-2">
      <img
        v-if="props.item.image"
        :src="props.item.image"
        :alt="props.item.name"
        class="h-8 w-8 object-contain"
      >
      <span class="font-bold">{{ props.item.name }}</span>
    </div>
    <span class="text-xs">{{ props.item.description }}</span>
    <div class="mt-1 flex items-center justify-end gap-1">
      <span class="font-bold">x{{ props.qty }}</span>
      <Button class="flex items-center gap-1 text-xs" @click="emit('use')">
        <div i-carbon-play inline-block />
        Utiliser
      </Button>
      <!--
      <Button type="danger" class="text-xs" @click="emit('sell')">
        Vendre
      </Button>
      -->
    </div>
  </div>
</template>
