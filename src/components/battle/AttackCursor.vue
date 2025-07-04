<script setup lang="ts">
const props = defineProps<{ x: number, y: number, clicked: boolean }>()
</script>

<template>
  <div
    class="i-mdi:sword pointer-events-none fixed z-100 transition-all"
    :class="props.clicked ? 'text-red-600 dark:text-red-400 scale-125' : 'text-white dark:text-gray-300 scale-100'"
    :style="{ left: `${props.x + 8}px`, top: `${props.y + 8}px` }"
  />
</template>
