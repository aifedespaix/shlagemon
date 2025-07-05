<script setup lang="ts">
import type { ButtonType } from '~/type/button'
import { computed } from 'vue'

const props = withDefaults(defineProps<{ type?: ButtonType }>(), {
  type: 'default',
})

const variantClass = computed(() => {
  switch (props.type) {
    case 'valid':
      return 'rounded px-2 py-1 text-white bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800'
    case 'danger':
      return 'rounded px-2 py-1 text-white bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800'
    case 'icon':
      return 'rounded-full p-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
    case 'menu':
      return 'flex-1 p-2 rounded bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
    case 'primary':
      return 'rounded px-2 py-1 text-white bg-blue-600 dark:bg-blue-700'
    default:
      return 'rounded px-2 py-1 text-white bg-cyan-600 dark:bg-cyan-700 hover:bg-cyan-700 dark:hover:bg-cyan-800/80'
  }
})
</script>

<template>
  <button class="inline-flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50" :class="variantClass">
    <slot />
  </button>
</template>
