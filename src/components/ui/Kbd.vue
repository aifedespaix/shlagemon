<script setup lang="ts">
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
    class="kbd-base"
    :class="[
      sizeClass,
      props.waiting ? 'animate-pulse opacity-70' : '',
    ]"
  >
    {{ label }}
  </kbd>
</template>

<style scoped>
.kbd-base {
  @apply inline-flex items-center justify-center select-none border rounded bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-500;
  box-shadow:
    inset 0 -2px 0 rgba(0, 0, 0, 0.2),
    inset 0 2px 0 rgba(255, 255, 255, 0.8),
    0 1px 1px rgba(0, 0, 0, 0.1);
}
.dark .kbd-base {
  box-shadow:
    inset 0 -2px 0 rgba(0, 0, 0, 0.5),
    inset 0 2px 0 rgba(255, 255, 255, 0.1),
    0 1px 1px rgba(0, 0, 0, 0.3);
}
</style>
