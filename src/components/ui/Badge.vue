<script setup lang="ts">
import type { BadgeColor, BadgeSize, BadgeVariant } from '~/type/badge'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  color?: BadgeColor
  variant?: BadgeVariant
  size?: BadgeSize
  icon?: string
}>(), {
  color: 'primary',
  variant: 'solid',
  size: 'sm',
})

const colorClasses = computed(() => {
  const map: Record<BadgeColor, Record<BadgeVariant, string>> = {
    primary: {
      solid: 'text-white bg-blue-600 dark:bg-blue-700',
      outline: 'border border-blue-600 dark:border-blue-700 text-blue-600 dark:text-blue-400',
      soft: 'bg-blue-600/20 dark:bg-blue-700/20 text-blue-600 dark:text-blue-400',
      ghost: 'text-blue-600 dark:text-blue-400',
      dashed: 'border border-dashed border-blue-600 dark:border-blue-700 text-blue-600 dark:text-blue-400',
    },
    alert: {
      solid: 'text-yellow-900 bg-yellow-400 dark:bg-yellow-500',
      outline: 'border border-yellow-500 text-yellow-600 dark:text-yellow-500',
      soft: 'bg-yellow-400/20 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-500',
      ghost: 'text-yellow-600 dark:text-yellow-500',
      dashed: 'border border-dashed border-yellow-500 text-yellow-600 dark:text-yellow-500',
    },
    danger: {
      solid: 'text-white bg-red-600 dark:bg-red-700',
      outline: 'border border-red-600 dark:border-red-700 text-red-600 dark:text-red-400',
      soft: 'bg-red-600/20 dark:bg-red-700/20 text-red-600 dark:text-red-400',
      ghost: 'text-red-600 dark:text-red-400',
      dashed: 'border border-dashed border-red-600 dark:border-red-700 text-red-600 dark:text-red-400',
    },
    info: {
      solid: 'text-white bg-cyan-600 dark:bg-cyan-700',
      outline: 'border border-cyan-600 dark:border-cyan-700 text-cyan-600 dark:text-cyan-400',
      soft: 'bg-cyan-600/20 dark:bg-cyan-700/20 text-cyan-600 dark:text-cyan-400',
      ghost: 'text-cyan-600 dark:text-cyan-400',
      dashed: 'border border-dashed border-cyan-600 dark:border-cyan-700 text-cyan-600 dark:text-cyan-400',
    },
    neutral: {
      solid: 'text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700',
      outline: 'border border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-300',
      soft: 'bg-gray-400/20 dark:bg-gray-600/20 text-gray-700 dark:text-gray-300',
      ghost: 'text-gray-700 dark:text-gray-300',
      dashed: 'border border-dashed border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-300',
    },
  }
  return map[props.color][props.variant]
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'text-xs px-1 py-0.5'
    case 'lg':
      return 'text-base px-3 py-1'
    case 'xl':
      return 'text-lg px-4 py-2'
    case 'md':
      return 'text-sm px-2 py-0.5'
    default:
      return 'text-xs px-2 py-0.5'
  }
})
</script>

<template>
  <span
    class="absolute right-0 top-0 flex translate-x-1/2 items-center gap-1 rounded-full -translate-y-1/2"
    :class="[colorClasses, sizeClasses]"
  >
    <span v-if="props.icon" class="h-4 w-4" :class="`i-${props.icon}`" />
    <slot />
  </span>
</template>
