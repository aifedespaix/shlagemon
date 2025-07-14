<script setup lang="ts">
import type { ShlagemonType } from '~/type'

interface Props {
  value: ShlagemonType
  size?: 'xs' | 'sm' | 'base' | 'lg'
  openOnClick?: boolean
}

const { value, size, openOnClick } = withDefaults(defineProps<Props>(), {
  size: 'xs',
  openOnClick: false,
})

const typeChart = useTypeChartModalStore()

const sizeClass = computed(() => {
  switch (size) {
    case 'sm':
      return 'text-sm'
    case 'base':
      return 'text-base'
    case 'lg':
      return 'text-lg'
    default:
      return 'text-xs'
  }
})

const textColor = computed(() => getAdjustedTextColor())

function handleClick() {
  if (openOnClick)
    typeChart.open(value.id)
}

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
  <span
    class="type overflow-hidden text-ellipsis rounded px-1.5 py-1 text-center leading-none"
    :class="[sizeClass, openOnClick ? 'cursor-pointer hover:opacity-80' : '']"
    :name="value.name"
    :style="{ backgroundColor: value.color, color: textColor }"
    @click="handleClick"
  >
    {{ value.name }}
  </span>
</template>
