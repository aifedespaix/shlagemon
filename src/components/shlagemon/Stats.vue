<script setup lang="ts">
interface Stat {
  label: string
  value: number
}
const props = defineProps<{ stats: Stat[] }>()

const statColors = [
  'bg-red-200 dark:bg-red-700',
  'bg-emerald-200 dark:bg-emerald-700',
  'bg-blue-200 dark:bg-blue-700',
  'bg-amber-200 dark:bg-amber-700',
  'bg-violet-200 dark:bg-violet-700',
  'bg-pink-200 dark:bg-pink-700',
]
</script>

<template>
  <div class="grid grid-cols-2 gap-2 text-sm">
    <div
      v-for="(stat, i) in props.stats"
      :key="stat.label"
      class="flex flex-col items-center rounded p-2 text-gray-900 transition-colors dark:text-white"
      :class="statColors[i % statColors.length]"
      hover="opacity-80"
    >
      <span class="font-semibold">{{ stat.label }}</span>
      <span class="text-base">{{ stat.value.toLocaleString() }}</span>
    </div>
  </div>
</template>
