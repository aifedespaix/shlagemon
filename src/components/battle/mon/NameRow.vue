<script setup lang="ts">
import { GOLD_FILTER } from '~/utils/iconStyles'

interface Props {
  /** Display name of the Shlagemon. */
  name: string
  /** Whether the current enemy is already owned. */
  owned?: boolean
  /** Show the ownership Shlageball icon. */
  showBall?: boolean
  /** Whether the current Shlagemon is shiny. */
  shiny?: boolean
  /** Tooltip to display when the ball icon is shown. */
  tooltipOwned?: string
  /** Player owns this Shlagemon with rarity 100 or more. */
  ownsRarity100?: boolean
  /** Player owns a shiny variant of this Shlagemon. */
  ownsShiny?: boolean
  /** Accessible label for the shiny badge. */
  shinyLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  owned: false,
  showBall: false,
  shiny: false,
  tooltipOwned: '',
  ownsRarity100: false,
  ownsShiny: false,
  shinyLabel: '',
})
</script>

<template>
  <div class="relative mt-1 flex items-center gap-1">
    <div v-if="props.showBall && props.owned" class="relative">
      <img
        v-tooltip="props.tooltipOwned"
        src="/items/shlageball/shlageball.webp"
        alt="ball"
        class="h-4 w-4"
        :style="props.ownsRarity100 ? GOLD_FILTER : ''"
        draggable="false"
      >
      <div
        v-if="props.ownsShiny"
        class="mask-rainbow i-mdi:star absolute h-2 w-2 -right-1 -top-1"
        :aria-label="props.shinyLabel"
      />
    </div>
    <span class="font-bold" :class="{ 'shiny-text': props.shiny }">{{ props.name }}</span>
    <div class="pointer-events-none absolute left-1/2 z-160 h-0 w-0 -top-4 -translate-x-1/2">
      <slot name="anchor" />
    </div>
    <span class="sr-only" aria-live="polite">
      <slot name="sr" />
    </span>
  </div>
</template>
