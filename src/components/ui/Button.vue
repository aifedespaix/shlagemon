<script setup lang="ts">
import type { ButtonType, ButtonVariant } from '~/type/button'

const props = withDefaults(defineProps<{ type?: ButtonType, variant?: ButtonVariant }>(), {
  type: 'default',
  variant: 'solid',
})

const variantClass = computed(() => {
  if (props.type === 'icon')
    return 'rounded-full p-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
  if (props.type === 'menu')
    return 'flex-1 p-2 rounded bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'

  const map: Record<Exclude<ButtonType, 'icon' | 'menu'>, Record<ButtonVariant, string>> = {
    primary: {
      solid: 'rounded px-2 py-1 text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800',
      outline: 'rounded px-2 py-1 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-800/20',
    },
    valid: {
      solid: 'rounded px-2 py-1 text-white bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800',
      outline: 'rounded px-2 py-1 border border-green-600 text-green-600 hover:bg-green-50 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-800/20',
    },
    danger: {
      solid: 'rounded px-2 py-1 text-white bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800',
      outline: 'rounded px-2 py-1 border border-red-600 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-800/20',
    },
    default: {
      solid: 'rounded px-2 py-1 text-white bg-cyan-600 dark:bg-cyan-700 hover:bg-cyan-700 dark:hover:bg-cyan-800/80',
      outline: 'rounded px-2 py-1 border border-cyan-600 text-cyan-600 hover:bg-cyan-50 dark:border-cyan-700 dark:text-cyan-400 dark:hover:bg-cyan-800/20',
    },
  }

  return map[props.type][props.variant]
})
</script>

<template>
  <button class="inline-flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50" :class="variantClass">
    <slot />
  </button>
</template>
