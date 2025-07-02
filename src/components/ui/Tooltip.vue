<script setup lang="ts">
import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom'
import { ref } from 'vue'

const props = defineProps<{ text: string }>()

const wrapper = ref<HTMLElement | null>(null)
const tooltip = ref<HTMLElement | null>(null)
const visible = ref(false)
let cleanup: (() => void) | undefined

function show() {
  visible.value = true
  if (wrapper.value && tooltip.value) {
    cleanup = autoUpdate(wrapper.value, tooltip.value, () => {
      computePosition(wrapper.value!, tooltip.value!, {
        placement: 'top',
        middleware: [offset(6), flip(), shift({ padding: 4 })],
      }).then(({ x, y }) => {
        Object.assign(tooltip.value!.style, {
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
</script>

<template>
  <span
    ref="wrapper"
    class="relative inline-flex items-center"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
  >
    <slot />
    <span
      v-show="visible"
      ref="tooltip"
      class="pointer-events-none absolute z-50 whitespace-nowrap rounded bg-gray-700 px-2 py-1 text-xs text-white dark:bg-gray-200 dark:text-gray-800"
    >{{ props.text }}</span>
  </span>
</template>
