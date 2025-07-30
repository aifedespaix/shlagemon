<script setup lang="ts">
import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom'

const props = defineProps<{ text: string, isButton?: boolean }>()

const isTouch = useMediaQuery('(pointer: coarse)')

const wrapper = ref<HTMLElement | null>(null)
const tooltip = ref<HTMLElement | null>(null)
const visible = ref(false)
let cleanup: (() => void) | undefined
let timeout: ReturnType<typeof setTimeout> | undefined

function show() {
  visible.value = true
  if (isTouch.value) {
    clearTimeout(timeout)
    timeout = setTimeout(hide, 4000)
  }
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
  if (timeout) {
    clearTimeout(timeout)
    timeout = undefined
  }
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
    <Transition name="fade">
      <span
        v-if="visible"
        ref="tooltip"
        role="tooltip"
        class="pointer-events-none absolute z-50 whitespace-nowrap rounded bg-gray-200 px-2 py-1 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-200"
      >{{ props.text }}</span>
    </Transition>
  </span>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
