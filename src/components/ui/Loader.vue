<script setup lang="ts">
const props = withDefaults(defineProps<{
  /** Taille du loader (xs, sm, md, lg, xl) */
  size?: Size
  /** Couleur principale (classe UnoCSS, ex: 'primary', 'blue-500', 'red-400', etc.) */
  color?: string
  /** Pour désactiver l'animation (utile debug/tests/accessibilité) */
  animated?: boolean
  /** Texte alternatif pour l'accessibilité (aria-label) */
  label?: string
}>(), {
  size: 'md',
  color: 'primary',
  animated: true,
  label: 'Chargement en cours...',
})
// =======================
//  SpinnerLoader.vue
// =======================

// -- Types props
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// -- Taille réelle en pixels par taille
const sizeMap: Record<Size, string> = {
  xs: 'h-4 w-4',
  sm: 'h-6 w-6',
  md: 'h-10 w-10',
  lg: 'h-14 w-14',
  xl: 'h-20 w-20',
} as const

// -- Classes dynamiques, purgées par UnoCSS
const ringColor = computed(() =>
  `border-${props.color} dark:border-${props.color}-light`,
)

// -- Animation CSS (pour transition fluide on/off)
const spinnerClasses = computed(() => [
  'inline-block align-middle rounded-full border-2 border-solid border-b-transparent',
  sizeMap[props.size],
  ringColor.value,
  props.animated ? 'animate-spin' : '',
  'transition-transform duration-500', // plus fluide si anim on/off
])

const ariaLabel = computed(() => props.label || 'Chargement')
</script>

<template>
  <span
    class="inline-flex flex-col select-none items-center justify-center gap-2"
    role="status"
    :aria-label="ariaLabel"
    aria-live="polite"
  >
    <!-- Spinner -->
    <span
      :class="spinnerClasses"
      aria-hidden="true"
      :tabindex="-1"
    />
    <!-- Slot texte optionnel -->
    <slot>
      <span class="sr-only mt-1 text-xs text-gray-500 md:not-sr-only dark:text-gray-400" aria-hidden="false">
        {{ ariaLabel }}
      </span>
    </slot>
  </span>
</template>

<style scoped>
/* Animation fallback pour compatibilité si pas UnoCSS animate-spin */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 0.8s linear infinite;
}
</style>
