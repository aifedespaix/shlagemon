<script setup lang="ts">
import { autoUpdate, computePosition, flip, offset, shift, type Placement } from '@floating-ui/dom'
import { ref, onUnmounted, type PropType } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  asButton: { type: Boolean, default: false },
  placement: { type: String as PropType<Placement>, default: 'bottom' }
})

const isTouch = useMediaQuery('(pointer: coarse)')
const wrapper = ref<HTMLElement | null>(null)
const tooltip = ref<HTMLElement | null>(null)
const visible = ref(false)
let cleanup: (() => void) | undefined
let timeout: ReturnType<typeof setTimeout> | undefined

function show() {
  visible.value = true
  updatePosition()
  if (isTouch.value) {
    clearTimeout(timeout)
    timeout = setTimeout(hide, 3000)
  }
}
function hide() {
  visible.value = false
  if (timeout) clearTimeout(timeout)
  if (cleanup) cleanup(), cleanup = undefined
}
function updatePosition() {
  const wrapperEl = wrapper.value
  const tooltipEl = tooltip.value
  if (!wrapperEl || !tooltipEl) return
  cleanup = autoUpdate(wrapperEl, tooltipEl, () => {
    computePosition(wrapperEl, tooltipEl, {
      placement: props.placement,
      middleware: [offset(8), flip(), shift({ padding: 8 })],
      strategy: 'fixed'
    }).then(({ x, y }) => {
      Object.assign(tooltipEl.style, {
        left: `${x}px`,
        top: `${y}px`
      })
    })
  })
}
onUnmounted(hide)
function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') hide()
}
</script>

<template>
  <span
    ref="wrapper"
    class="relative inline-flex items-center outline-none"
    :tabindex="props.asButton ? 0 : undefined"
    :aria-describedby="visible ? 'tooltip-content' : undefined"
    :role="props.asButton ? 'button' : undefined"
    :aria-label="props.asButton ? props.text : undefined"
    @mouseenter="show"
    @mouseleave="hide"
    @focus="show"
    @blur="hide"
    @click="isTouch ? show() : undefined"
    @keydown="onKeyDown"
  >
    <slot />
    <Transition name="tooltip-fade">
      <span
        v-if="visible"
        ref="tooltip"
        id="tooltip-content"
        role="tooltip"
        class="
          pointer-events-none
          fixed z-50 px-2 py-1 min-w-[2.5rem]
          rounded-xl shadow-lg
          bg-neutral-900/90 text-xs text-neutral-50
          font-medium select-none
          transition-all duration-150
          will-change-transform opacity-0 scale-95 translate-y-2
          data-[show=true]:opacity-100 data-[show=true]:scale-100 data-[show=true]:translate-y-0
        "
        :data-show="visible"
      >
        {{ props.text }}
      </span>
    </Transition>
  </span>
</template>

<style scoped>
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.15s cubic-bezier(.5,1.5,.6,1), transform 0.15s cubic-bezier(.5,1.5,.6,1);
}
.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(8px);
}
.tooltip-fade-enter-to,
.tooltip-fade-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}
</style>
