<script setup lang="ts">
import type { ShlagCard } from '~/type'
import { shlagemonTypes } from '~/data/shlagemons-type'

const props = defineProps<{ card: ShlagCard, revealed?: boolean, selectable?: boolean }>()
const emit = defineEmits<{ (e: 'select'): void }>()
</script>

<template>
  <div
    class="relative h-28 w-20 md:w-24" @click="props.selectable && emit('select')"
  >
    <div
      class="absolute inset-0 preserve-3d transition-transform duration-500"
      :class="props.revealed ? 'rotate-y-180' : ''"
    >
      <div class="backface-hidden h-full w-full flex items-center justify-center border rounded bg-gray-200 dark:bg-gray-800">
        <div class="i-mdi-cards-playing-outline text-3xl" />
      </div>
      <div class="backface-hidden h-full w-full flex flex-col rotate-y-180 items-center justify-between border rounded bg-white p-1 text-xs dark:bg-gray-900">
        <img :src="props.card.image" :alt="props.card.name" class="h-12 w-full object-contain">
        <span class="text-center font-bold">{{ props.card.name }}</span>
        <span><ShlagemonType :value="shlagemonTypes[props.card.type]" size="xs" /></span>
        <span>P {{ props.card.power }}</span>
        <span>{{ props.card.effect }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preserve-3d {
  transform-style: preserve-3d;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
.backface-hidden {
  backface-visibility: hidden;
}
</style>
