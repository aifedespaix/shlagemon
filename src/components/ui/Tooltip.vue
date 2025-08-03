<script setup lang="ts">
import type { Placement } from 'floating-vue'
import type { PropType } from 'vue'
import { Tooltip as FloatingTooltip } from 'floating-vue'

/**
 * Wrapper around `floating-vue` tooltip with theme-aware styling.
 */
const props = defineProps({
  /** Tooltip text to display. */
  text: { type: String, required: true },
  /** Whether the wrapped element should behave like a button. */
  asButton: { type: Boolean, default: false },
  /** Tooltip placement around the trigger element. */
  placement: { type: String as PropType<Placement>, default: 'bottom' },
})
</script>

<template>
  <FloatingTooltip :placement="props.placement" :distance="8" :triggers="['hover', 'focus', 'touch']">
    <span
      class="relative inline-flex items-center outline-none"
      :tabindex="props.asButton ? 0 : undefined"
      :role="props.asButton ? 'button' : undefined"
      :aria-label="props.asButton ? props.text : undefined"
    >
      <slot />
    </span>
    <template #popper>
      <span
        class="pointer-events-none z-50 rounded-xl bg-neutral-900/90 px-2 py-1 text-xs text-neutral-50 font-medium shadow-lg dark:bg-neutral-50 dark:text-neutral-900"
      >
        {{ props.text }}
      </span>
    </template>
  </FloatingTooltip>
</template>

<style scoped>
/* No additional styles needed; relying on FloatingVue defaults */
</style>
