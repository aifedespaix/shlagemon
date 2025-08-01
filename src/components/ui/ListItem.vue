<script setup lang="ts">
type Colors = 'success' | 'info' | 'warning' | 'danger' | 'neutral' | 'locked'

const props = withDefaults(defineProps<{
  active?: boolean
  disabled?: boolean
  tabindex?: number
  as?: string
  role?: string
  ariaLabel?: string
  color?: Colors
  highlight?: boolean
}>(), {
  active: false,
  disabled: false,
  highlight: false,
  tabindex: 0,
  as: 'div',
  role: undefined,
  ariaLabel: undefined,
  color: undefined,
})

const tag = computed(() => props.as)

const colorClassMap: Record<Colors, string[]> = {
  success: [
    'border-emerald-500',
    'bg-emerald-50',
    'text-emerald-900',
    'dark:border-emerald-400',
    'dark:bg-emerald-900/70',
    'dark:text-emerald-50',
  ],
  info: [
    'border-sky-500',
    'bg-sky-50',
    'text-sky-900',
    'dark:border-sky-400',
    'dark:bg-sky-900/70',
    'dark:text-sky-50',
  ],
  warning: [
    'border-amber-500',
    'bg-amber-50',
    'text-amber-900',
    'dark:border-amber-400',
    'dark:bg-amber-900/70',
    'dark:text-amber-50',
  ],
  danger: [
    'border-rose-500',
    'bg-rose-50',
    'text-rose-900',
    'dark:border-rose-400',
    'dark:bg-rose-900/70',
    'dark:text-rose-50',
  ],
  neutral: [
    'border-gray-300',
    'bg-white',
    'text-gray-700',
    'dark:border-gray-700',
    'dark:bg-gray-900/70',
    'dark:text-gray-100',
  ],
  locked: [
    'border-gray-400',
    'bg-gray-100',
    'text-gray-400',
    'dark:border-gray-700',
    'dark:bg-gray-800/80',
    'dark:text-gray-600',
    'opacity-70',
    'saturate-0',
    'select-none',
  ],
} as const

const classes = computed(() => {
  const classes: string[] = [
    'relative w-full flex items-center gap-2 px-2 py-1 border rounded-lg shadow-sm outline-none transition-all duration-150',
    'focus-visible:ring-2 focus-visible:ring-sky-400',
    'hover:shadow-lg hover:scale-[1.01] active:scale-100',
  ]

  if (props.disabled)
    classes.push('pointer-events-none opacity-50 saturate-0')
  if (props.highlight)
    classes.push('animate-highlight bg-sky-900/20 dark:bg-sky-900/20')
  if (props.active)
    classes.push('bg-sky-100 border-sky-400 ring-2 ring-sky-300 dark:bg-sky-900/50 dark:border-sky-500 dark:ring-sky-700')

  // Color logic
  if (props.color && colorClassMap[props.color])
    classes.push(...colorClassMap[props.color])

  return classes.join(' ')
})
</script>

<template>
  <component
    :is="tag"
    :class="classes"
    :role="props.role"
    :aria-selected="props.role === 'option' ? props.active : undefined"
    :aria-disabled="props.disabled || undefined"
    :aria-label="props.ariaLabel"
    :tabindex="props.disabled ? -1 : props.tabindex"
  >
    <span v-if="$slots.left" class="flex items-center">
      <slot name="left" />
    </span>
    <div class="min-w-0 flex-1">
      <slot />
    </div>
    <span v-if="$slots.right" class="flex items-center">
      <slot name="right" />
    </span>
  </component>
</template>
