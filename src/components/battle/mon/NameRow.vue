<script setup lang="ts">
interface Props {
  name: string
  owned?: boolean
  showBall?: boolean
  shiny?: boolean
  tooltipOwned?: string
}

const props = withDefaults(defineProps<Props>(), {
  owned: false,
  showBall: false,
  shiny: false,
  tooltipOwned: '',
})
</script>

<template>
  <div class="relative mt-1 flex items-center gap-1">
    <img
      v-if="props.showBall && props.owned"
      v-tooltip="props.tooltipOwned"
      src="/items/shlageball/shlageball.webp"
      alt="ball"
      class="h-4 w-4"
    >
    <span class="font-bold" :class="{ 'shiny-text': props.shiny }">{{ props.name }}</span>
    <div class="pointer-events-none absolute left-1/2 z-160 h-0 w-0 -top-4 -translate-x-1/2">
      <slot name="anchor" />
    </div>
    <span class="sr-only" aria-live="polite">
      <slot name="sr" />
    </span>
  </div>
</template>
