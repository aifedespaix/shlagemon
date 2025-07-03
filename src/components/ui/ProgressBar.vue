<script setup lang="ts">
const { value, max, color, xp } = withDefaults(defineProps<{
  value: number
  max: number
  color?: string
  xp?: boolean
}>(), { xp: false })
const percent = computed(() => max === 0 ? 0 : (value / max) * 100)
</script>

<template>
  <div class="h-2 w-full overflow-hidden rounded bg-gray-200 dark:bg-gray-700">
    <div
      class="h-full transition-all duration-300"
      :class="xp ? 'xp-bar' : (color ?? 'bg-blue-800')"
      :style="{ width: `${percent}%` }"
    />
  </div>
</template>

<style scoped>
.xp-bar {
  background-image: linear-gradient(90deg, #4ade80, #67e8f9, #4ade80);
  background-size: 200% 100%;
  animation: xp-flow 4s linear infinite;
}

.dark .xp-bar {
  background-image: linear-gradient(90deg, #166534, #0e7490, #166534);
}

@keyframes xp-flow {
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: -200% 0%;
  }
}
</style>
