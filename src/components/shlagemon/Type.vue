<script setup lang="ts">
import { computed } from 'vue'
import type { ShlagemonType } from '~/type'

// Props strictement typées
const props = withDefaults(defineProps<{
  value: Readonly<ShlagemonType>
  size?: 'xs' | 'sm' | 'base' | 'lg'
  openOnClick?: boolean
}>(), {
  size: 'xs',
  openOnClick: false,
})

// Store modal typé (à adapter selon ton architecture)
const typeChart = useTypeChartModalStore()

// Taillez responsive : clampé pour éviter des extrêmes
const sizeStyle = computed(() => {
  switch (props.size) {
    case 'lg':
      return { fontSize: 'clamp(1.15rem, 2vw, 1.35rem)', padding: '0.4rem 1.1rem', borderRadius: '1.5rem', minWidth: '2.4rem', minHeight: '1.8rem' }
    case 'base':
      return { fontSize: 'clamp(1rem, 1.5vw, 1.13rem)', padding: '0.33rem 0.85rem', borderRadius: '1.2rem', minWidth: '2rem', minHeight: '1.5rem' }
    case 'sm':
      return { fontSize: 'clamp(0.88rem, 1vw, 1rem)', padding: '0.26rem 0.65rem', borderRadius: '1rem', minWidth: '1.6rem', minHeight: '1.18rem' }
    default: // xs
      // ➜ bien plus petit : micro-badge style "tag"
      return { fontSize: 'clamp(0.70rem, 0.7vw, 0.85rem)', padding: '0.13rem 0.38rem', borderRadius: '0.7rem', minWidth: '1.1rem', minHeight: '0.9rem' }
  }
})

// Calcul intelligent du texte : auto-contraste
const textColor = computed(() => {
  const hex = props.value.color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  // YIQ contrast
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  // Force le blanc ou le noir, pas d’ajustement couleur ici, pour la lisibilité stricte
  return yiq >= 160 ? '#1a1a1a' : '#fff'
})

function handleClick() {
  if (props.openOnClick)
    typeChart.open(props.value.id)
}
</script>

<template>
  <span
    class="
      inline-flex items-center justify-center
      transition-all
      shadow-sm
      select-none
      border border-black/5
      font-semibold
      outline-none
      duration-150
      relative
      focus-visible:ring-2 focus-visible:ring-sky-400
      hover:scale-105 active:scale-97
      will-change-transform
      transition-transform
      cursor-pointer
      user-select-none
    "
    :tabindex="props.openOnClick ? 0 : undefined"
    :role="props.openOnClick ? 'button' : undefined"
    :aria-pressed="props.openOnClick ? 'false' : undefined"
    :aria-label="`Type ${props.value.name}`"
    :name="props.value.name"
    :style="{
      backgroundColor: props.value.color,
      color: textColor,
      ...sizeStyle
    }"
    @click.stop="handleClick"
    @keydown.enter.space.prevent="handleClick"
  >
    <span class="truncate w-full text-center leading-none pointer-events-none">
      {{ props.value.name }}
    </span>
  </span>
</template>
