<script setup lang="ts">
/**
 * Generic list item component with optional left and right slots.
 * @prop active - highlights the item as selected
 * @prop disabled - disables interactions and visuals
 * @prop tabindex - tab index for focus navigation
 * @prop as - tag name for root element
 * @prop role - optional ARIA role
 * @prop ariaLabel - optional label for assistive technologies
 */
const props = withDefaults(defineProps<{
  active?: boolean
  disabled?: boolean
  tabindex?: number
  as?: string
  role?: string
  ariaLabel?: string
}>(), {
  active: false,
  disabled: false,
  tabindex: 0,
  as: 'div',
  role: undefined,
  ariaLabel: undefined,
})

const tag = computed(() => props.as)

const classes = computed(() => [
  'group relative w-full flex items-center gap-2 min-h-11 px-2 py-1 border rounded-lg bg-white/80 dark:bg-gray-900/70 shadow-sm outline-none transition-all duration-150',
  'focus-visible:ring-2 focus-visible:ring-sky-400',
  props.disabled
    ? 'pointer-events-none opacity-50 saturate-0'
    : 'hover:shadow-lg hover:scale-[1.01] active:scale-100',
  props.active
    ? 'bg-sky-500/10 border-sky-500 ring-2 ring-sky-400'
    : 'border-gray-300 dark:border-gray-700',
])
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
    <span v-if="$slots.left" class="mr-1 flex items-center">
      <slot name="left" />
    </span>
    <div class="min-w-0 flex-1">
      <slot />
    </div>
    <span v-if="$slots.right" class="ml-1 flex items-center">
      <slot name="right" />
    </span>
  </component>
</template>
