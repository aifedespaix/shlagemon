<script setup lang="ts">
import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom'

const props = defineProps<{ text: string, isButton?: boolean }>()

const wrapper = ref<HTMLElement | null>(null)
const tooltip = ref<HTMLElement | null>(null)
const visible = ref(false)
let cleanup: (() => void) | undefined

function show() {
  visible.value = true
  const wrapperEl = wrapper.value
  const tooltipEl = tooltip.value
  if (wrapperEl && tooltipEl) {
    cleanup = autoUpdate(wrapperEl, tooltipEl, () => {
      if (!wrapperEl || !tooltipEl)
        return
      computePosition(wrapperEl, tooltipEl, {
        placement: 'top',
        middleware: [offset(6), flip(), shift({ padding: 4 })],
      }).then(({ x, y }) => {
        Object.assign(tooltipEl.style, {
          left: `${x}px`,
          top: `${y}px`,
        })
      })
    })
  }
}

function hide() {
  visible.value = false
  if (cleanup) {
    cleanup()
    cleanup = undefined
  }
}

onUnmounted(hide)
</script>

<template>
  <span
    ref="wrapper"
    class="relative inline-flex items-center"
    :class="isButton ? 'cursor-pointer' : 'cursor-default'"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
    @click="show"
  >
    <slot />
    <span
      v-show="visible"
      ref="tooltip"
      class="pointer-events-none absolute z-50 whitespace-nowrap rounded bg-gray-700 px-2 py-1 text-xs text-white dark:bg-gray-200 dark:text-gray-800"
    >{{ props.text }}</span>
  </span>
</template>
