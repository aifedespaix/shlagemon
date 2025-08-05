<script setup lang="ts">
interface Stat {
  label: string
  value: number
}
const props = defineProps<{
  stats: Stat[]
  compact?: boolean
}>()

const statColors = [
  'bg-red-100 dark:bg-red-900',
  'bg-emerald-100 dark:bg-emerald-900',
  'bg-blue-100 dark:bg-blue-900',
  'bg-amber-100 dark:bg-amber-900',
  'bg-violet-100 dark:bg-violet-900',
  'bg-pink-100 dark:bg-pink-900',
]
</script>

<template>
  <div :class="props.compact ? 'grid grid-cols-2 gap-1' : 'grid grid-cols-2 gap-2'">
    <div
      v-for="(stat, i) in props.stats"
      :key="stat.label"
      :class="[
        'flex items-center rounded transition-colors text-gray-900 dark:text-white cursor-pointer select-none',
        props.compact
          ? `px-2 py-1 min-h-[28px] text-xs font-medium ${statColors[i % statColors.length]}`
          : `flex-col items-center p-2 text-sm font-semibold ${statColors[i % statColors.length]}`
      ]"
      hover="opacity-80"
      tabindex="0"
      role="button"
      aria-label="Voir la statistique"
    >
      <span class="truncate flex-1 text-left">{{ stat.label }}</span>
      <span class="ml-2 tabular-nums font-bold">{{ stat.value.toLocaleString() }}</span>
    </div>
  </div>
</template>
