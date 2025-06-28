<script setup lang="ts">
const { value, max, color } = defineProps<{
  value: number
  max: number
  color?: string
}>()
const percent = computed(() => max === 0 ? 0 : (value / max) * 100)
</script>

<template>
  <div class="h-2 w-full overflow-hidden rounded bg-gray-200 dark:bg-gray-700">
    <div class="h-full transition-all duration-300" :class="color ?? 'bg-primary'" :style="{ width: `${percent}%` }" />
  </div>
</template>
