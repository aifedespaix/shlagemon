<script setup lang="ts">
import { computed } from 'vue'

type Size = 'sm' | 'md' | 'lg' | 'xl'

const props = withDefaults(defineProps<{ keyName: string, size?: Size, waiting?: boolean }>(), {
  size: 'md',
  waiting: false,
})

const KEY_LABELS: Record<string, string> = {
  'Control': 'Ctrl',
  'Alt': 'Alt',
  'Shift': 'Maj',
  'Meta': 'Windows',
  'Tab': 'Tab',
  ' ': 'Space',
  'ArrowUp': '↑',
  'ArrowDown': '↓',
  'ArrowLeft': '←',
  'ArrowRight': '→',
}

const label = computed(() => KEY_LABELS[props.keyName] ?? props.keyName)

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-xs px-1 py-0.5'
    case 'lg':
      return 'text-base px-3 py-1'
    case 'xl':
      return 'text-lg px-4 py-1'
    default:
      return 'text-sm px-2 py-0.5'
  }
})
</script>

<template>
  <kbd
    :class="`
      inline-flex items-center justify-center border rounded select-none bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-500 ${sizeClass} ${props.waiting ? 'animate-pulse opacity-70' : ''}
    `"
  >
    {{ label }}
  </kbd>
</template>
