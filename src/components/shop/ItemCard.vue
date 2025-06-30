<script setup lang="ts">
import type { Item } from '~/type/item'

const props = defineProps<{ item: Item }>()
</script>

<template>
  <div class="flex items-center gap-2 border rounded bg-white p-2 dark:bg-gray-900">
    <img v-if="props.item.image" :src="props.item.image" :alt="props.item.name" class="h-8 w-8 object-contain">
    <div class="flex flex-1 flex-col text-left">
      <span class="font-bold">{{ props.item.name }}</span>
      <span class="text-xs">{{ props.item.description }}</span>
    </div>
    <span class="font-bold">{{ props.item.price }}$</span>
    <slot />
  </div>
</template>
