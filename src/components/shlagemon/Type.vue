<script setup lang="ts">
import type { ShlagemonType } from '~/type'
import { computed } from 'vue'

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
const { t } = useI18n()

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
  const r = Number.parseInt(hex.substring(0, 2), 16)
  const g = Number.parseInt(hex.substring(2, 4), 16)
  const b = Number.parseInt(hex.substring(4, 6), 16)
  // YIQ contrast
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  // Force le blanc ou le noir, pas d’ajustement couleur ici, pour la lisibilité stricte
  return yiq >= 160 ? '#1a1a1a' : '#fff'
})

const typeName = computed(() => t(props.value.name))

function handleClick() {
  if (props.openOnClick)
    typeChart.open(props.value.id)
}
</script>

<template>
  <span
    class="user-select-none relative inline-flex cursor-pointer select-none items-center justify-center border border-black/5 font-semibold shadow-sm outline-none transition-all transition-transform duration-150 will-change-transform active:scale-97 hover:scale-105 focus-visible:ring-2 focus-visible:ring-sky-400"
    :tabindex="props.openOnClick ? 0 : undefined"
    :role="props.openOnClick ? 'button' : undefined"
    :aria-pressed="props.openOnClick ? 'false' : undefined"
    :aria-label="typeName"
    :name="typeName"
    :style="{
      backgroundColor: props.value.color,
      color: textColor,
      ...sizeStyle,
    }"
    @click.stop="handleClick"
    @keydown.enter.space.prevent="handleClick"
  >
    <span class="pointer-events-none w-full truncate text-center leading-none">
      {{ typeName }}
    </span>
  </span>
</template>
