<script setup lang="ts">
import type { Placement } from 'floating-vue'
import type { PropType } from 'vue'
import { Tooltip as FloatingTooltip } from 'floating-vue'

const props = defineProps({
  text: { type: String, required: true },
  asButton: { type: Boolean, default: false },
  placement: { type: String as PropType<Placement>, default: 'bottom' },
})
</script>

<template>
  <FloatingTooltip
    :placement="props.placement" :distance="8" :triggers="['hover', 'focus', 'touch']"
  >
    <span
      class="relative inline-flex items-center outline-none"
      :tabindex="props.asButton ? 0 : undefined"
      :role="props.asButton ? 'button' : undefined"
      :aria-label="props.asButton ? props.text : undefined"
    >
      <slot />
    </span>
    <template #popper>
      {{ props.text }}
    </template>
  </FloatingTooltip>
</template>
