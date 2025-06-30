<script setup lang="ts">
import type { ShlagemonType } from '~/type'

const { value } = defineProps<{ value: ShlagemonType }>()

const textColor = computed(() => getAdjustedTextColor())

function getAdjustedTextColor(amount = 60) {
  const hex = value.color.replace('#', '')
  const r = Number.parseInt(hex.substring(0, 2), 16)
  const g = Number.parseInt(hex.substring(2, 4), 16)
  const b = Number.parseInt(hex.substring(4, 6), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  const isBright = brightness > 160
  const adjust = (c: number) => Math.min(255, Math.max(0, c + (isBright ? -amount : amount)))
  const newR = adjust(r)
  const newG = adjust(g)
  const newB = adjust(b)
  return `#${[newR, newG, newB].map(c => c.toString(16).padStart(2, '0')).join('')}`
}
</script>

<template>
  <span class="type rounded px-2 py-1 text-center text-xs" :style="{ backgroundColor: value.color, color: textColor }">
    {{ value.name }}
  </span>
</template>
