<script setup lang="ts">
import type { ButtonType } from '~/types/button'
import { computed } from 'vue'

const props = withDefaults(defineProps<{ type?: ButtonType }>(), {
  type: 'primary',
})

const variantClass = computed(() => {
  switch (props.type) {
    case 'valid':
      return 'bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800'
    case 'danger':
      return 'bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800'
    default:
      return 'bg-cyan-600 dark:bg-cyan-700 hover:bg-cyan-700 dark:hover:bg-cyan-800/80'
  }
})
</script>

<template>
  <button class="rounded px-2 py-1 text-white" :class="variantClass">
    <slot />
  </button>
</template>
