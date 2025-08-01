<script setup lang="ts">
// Typage strict, tu ajoutes/modifies selon ton projet
import type { BadgeColor, BadgeSize, BadgeVariant } from '~/type/badge'

const props = withDefaults(defineProps<{
  color?: BadgeColor
  variant?: BadgeVariant
  size?: BadgeSize
  icon?: string
  inner?: boolean
  ariaLabel?: string
}>(), {
  color: 'primary',
  variant: 'solid',
  size: 'sm',
  inner: false,
})

const colorClasses = computed(() => {
  const map: Record<BadgeColor, Record<BadgeVariant, string>> = {
    primary: {
      solid: 'bg-blue-600 text-white dark:bg-blue-700',
      outline: 'border border-blue-600 dark:border-blue-700 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900',
      soft: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      ghost: 'text-blue-600 dark:text-blue-400 bg-transparent',
      dashed: 'border border-dashed border-blue-600 dark:border-blue-700 text-blue-600 dark:text-blue-400 bg-transparent',
    },
    alert: {
      solid: 'bg-yellow-400 text-yellow-900 dark:bg-yellow-500',
      outline: 'border border-yellow-500 text-yellow-700 dark:text-yellow-500 bg-white dark:bg-gray-900',
      soft: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200',
      ghost: 'text-yellow-700 dark:text-yellow-500 bg-transparent',
      dashed: 'border border-dashed border-yellow-500 text-yellow-700 dark:text-yellow-500 bg-transparent',
    },
    danger: {
      solid: 'bg-red-600 text-white dark:bg-red-700',
      outline: 'border border-red-600 dark:border-red-700 text-red-600 dark:text-red-400 bg-white dark:bg-gray-900',
      soft: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
      ghost: 'text-red-600 dark:text-red-400 bg-transparent',
      dashed: 'border border-dashed border-red-600 dark:border-red-700 text-red-600 dark:text-red-400 bg-transparent',
    },
    info: {
      solid: 'bg-cyan-600 text-white dark:bg-cyan-700',
      outline: 'border border-cyan-600 dark:border-cyan-700 text-cyan-700 dark:text-cyan-300 bg-white dark:bg-gray-900',
      soft: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-200',
      ghost: 'text-cyan-700 dark:text-cyan-300 bg-transparent',
      dashed: 'border border-dashed border-cyan-600 dark:border-cyan-700 text-cyan-700 dark:text-cyan-300 bg-transparent',
    },
    neutral: {
      solid: 'bg-gray-300 text-gray-900 dark:bg-gray-600 dark:text-gray-100',
      outline: 'border border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900',
      soft: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
      ghost: 'text-gray-700 dark:text-gray-200 bg-transparent',
      dashed: 'border border-dashed border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-200 bg-transparent',
    },
  } as const
  return map[props.color][props.variant]
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'xs': return 'text-[0.625rem] min-w-4 h-4 px-1 py-0.5'
    case 'sm': return 'text-xs min-w-5 h-5 px-1.5 py-0.5'
    case 'md': return 'text-sm min-w-6 h-6 px-2 py-1'
    case 'lg': return 'text-base min-w-7 h-7 px-2.5 py-1.5'
    case 'xl': return 'text-lg min-w-8 h-8 px-3 py-2'
    case 'square': return 'aspect-square min-w-5 h-5 p-0 flex items-center justify-center'
    default: return 'text-xs min-w-5 h-5 px-1.5 py-0.5'
  }
})

const positionClasses = computed(() => {
  return [
    'absolute',
    'top-0',
    'right-0',
    'flex',
    'items-center',
    'justify-center',
    'pointer-events-auto',
    `z-20`,
    props.inner ? '' : 'translate-x-1/2 -translate-y-1/2',
  ].filter(Boolean).join(' ')
})
</script>

<template>
  <span
    class="box-border select-none whitespace-nowrap border-2 border-white rounded-full shadow-black/10 shadow-sm transition-all duration-150 dark:border-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70" :class="[
      colorClasses,
      sizeClasses,
      positionClasses,
    ]"
    :aria-label="props.ariaLabel"
    role="status"
    :tabindex="-1"
  >
    <span v-if="props.icon" class="h-4 w-4 flex items-center justify-center" :class="props.icon" />
    <slot />
  </span>
</template>

<style scoped>
/* Pour éviter que le badge ne s'écroule s'il n'y a qu'un chiffre */
span[role='status'] {
  font-variant-numeric: tabular-nums;
  line-height: 1;
}
/* Fix pour ne jamais dépasser du parent (facultatif) */
:host {
  position: relative;
  display: inline-block;
}
</style>
