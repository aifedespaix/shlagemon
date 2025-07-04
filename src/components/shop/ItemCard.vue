<script setup lang="ts">
import type { Item } from '~/type/item'
import ShlagediamondIcon from '~/components/icons/shlagediamond.vue'
import ShlagidolarIcon from '~/components/icons/shlagidolar.vue'

const props = defineProps<{ item: Item }>()
</script>

<template>
  <div class="flex items-center gap-2 border rounded bg-white p-2 dark:bg-gray-900">
    <div
      v-if="props.item.icon"
      class="h-8 w-8"
      :class="[props.item.iconClass, `i-${props.item.icon}`]"
    />
    <img v-else-if="props.item.image" :src="props.item.image" :alt="props.item.name" class="h-8 w-8 object-contain">
    <div class="flex flex-1 flex-col text-left">
      <span class="font-bold">{{ props.item.name }}</span>
      <span class="text-xs">{{ props.item.description }}</span>
    </div>
    <span class="flex items-center gap-1 font-bold">
      <component :is="props.item.currency === 'shlagidiamond' ? ShlagediamondIcon : ShlagidolarIcon" class="h-4 w-4" />
      {{ props.item.price }}
    </span>
    <slot />
  </div>
</template>
