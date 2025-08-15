<script setup lang="ts">
type Size = 'sm' | 'md' | 'lg'

interface Props {
  /** v-model */
  modelValue: number
  /** Borne min (valeur minimale atteignable). */
  min?: number
  /** Borne max. */
  max?: number
  /** Pas minimal (>=0). */
  step?: number
  /** Désactivation. */
  disabled?: boolean
  /** Taille visuelle. */
  size?: Size
  /** Classe couleur (UnoCSS) de la partie active [min → valeur]. */
  colorClass?: string
  /** Classe de la piste générale (inactive). */
  trackClass?: string
  /** Classe de la zone "pré-min" [origin → min]. */
  preMinClass?: string
  /**
   * Origine visuelle utilisée pour dessiner la zone grisée avant min.
   * Par défaut 0, ce qui couvre [0 → min]. Si tu mets origin = min, la zone disparaît.
   */
  origin?: number
  /** Nom de champ si utilisé dans un <form>. */
  name?: string
  /** Libellé ARIA si aucun label visible. */
  ariaLabel?: string
  /** Suffixe d’unité pour les labels (ex: 'pts', '%', '€'). */
  unit?: string
  /** Format d’affichage de la valeur du centre. */
  format?: (v: number) => string
}

const props = withDefaults(defineProps<Props>(), {
  min: 1,
  max: 100,
  step: 1,
  disabled: false,
  size: 'md',
  colorClass: 'bg-primary',
  trackClass: 'bg-gray-5 dark:bg-gray-8',
  preMinClass: 'bg-gray-300 dark:bg-gray-600',
  origin: 0,
  name: undefined,
  ariaLabel: undefined,
  unit: 'pts',
  format: (v: number) => String(v),
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'input', value: number): void
  (e: 'change', value: number): void
}>()

/** === Refs ============================================================= */
const trackRef = ref<HTMLDivElement | null>(null)
const handleRef = ref<HTMLButtonElement | null>(null)
const isActive = ref(false)
const isFocused = ref(false)
const rect = ref<DOMRect | null>(null)
const internal = ref<number>(props.modelValue)

/** === Derivés / utils ================================================== */
const range = computed(() => Math.max(0, props.max - props.min))
const safeStep = computed(() => Math.max(0, props.step))

function clamp(v: number): number {
  return Math.min(props.max, Math.max(props.min, v))
}
function toStepped(v: number): number {
  if (safeStep.value <= 0)
    return clamp(v)
  const n = Math.round((v - props.min) / safeStep.value)
  return clamp(props.min + n * safeStep.value)
}
function updateRect() {
  rect.value = trackRef.value?.getBoundingClientRect() ?? null
}

/** === Mapping curseur → valeur (corrigé) ================================ */
/** On mappe la position sur [origin..max], puis on clamp sur [min..max]. */
const visualSpan = computed(() => Math.max(1e-6, props.max - props.origin))
function posToValue(clientX: number): number {
  const r = rect.value
  if (!r || r.width === 0)
    return internal.value
  const ratio = (clientX - r.left) / r.width
  const rawFromOrigin = props.origin + ratio * visualSpan.value
  return toStepped(rawFromOrigin)
}

/** Pourcentages cohérents dans le même référentiel [origin..max] */
const preMinPercent = computed<number>(() => {
  if (props.min <= props.origin)
    return 0
  return ((props.min - props.origin) / visualSpan.value) * 100
})
const handleLeftPercent = computed<number>(() => {
  const posFromOrigin = Math.min(props.max, Math.max(props.origin, internal.value)) - props.origin
  return (posFromOrigin / visualSpan.value) * 100
})
/** Right = position de la valeur dans [origin..max], width = right - left */
const activeRightPercent = computed<number>(() => handleLeftPercent.value)
const activeWidthPercent = computed<number>(() => {
  // largeur de la zone active [min..valeur] exprimée en % de la piste [origin..max]
  return Math.max(0, activeRightPercent.value - preMinPercent.value)
})

/** Taille / tokens visuels */
const sizeTokens = computed((): Readonly<{
  trackH: string
  handle: string
  ring: string
}> => {
  switch (props.size) {
    case 'sm': return { trackH: 'h-1.5', handle: 'h-4 w-4', ring: 'ring-2' } as const
    case 'lg': return { trackH: 'h-3', handle: 'h-6 w-6', ring: 'ring-3' } as const
    default: return { trackH: 'h-2', handle: 'h-5 w-5', ring: 'ring-2' } as const
  }
})

/** === Watch / lifecycle =============================================== */
watch(() => props.modelValue, (v) => {
  internal.value = toStepped(v)
}, { immediate: true })

let ro: ResizeObserver | null = null
onMounted(() => {
  updateRect()
  ro = new ResizeObserver(() => updateRect())
  trackRef.value && ro.observe(trackRef.value)
  window.addEventListener('resize', updateRect, { passive: true })
  window.addEventListener('scroll', updateRect, { passive: true })
})
onBeforeUnmount(() => {
  ro?.disconnect(); ro = null
  window.removeEventListener('resize', updateRect)
  window.removeEventListener('scroll', updateRect)
})

/** === Interactions ===================================================== */
function addMoveEnd() {
  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('touchmove', onMove, { passive: true })
  window.addEventListener('mouseup', onEnd, { passive: true })
  window.addEventListener('touchend', onEnd, { passive: true })
  window.addEventListener('touchcancel', onEnd, { passive: true })
}
function removeMoveEnd() {
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('touchmove', onMove)
  window.removeEventListener('mouseup', onEnd)
  window.removeEventListener('touchend', onEnd)
  window.removeEventListener('touchcancel', onEnd)
}

function applyLive(next: number) {
  // important: clamp sur [min..max] après mapping [origin..max]
  const stepped = toStepped(Math.min(props.max, Math.max(props.min, next)))
  if (stepped !== internal.value) {
    internal.value = stepped
    emit('update:modelValue', stepped)
    emit('input', stepped)
  }
}

function onTrackPointerDown(e: MouseEvent | TouchEvent) {
  if (props.disabled)
    return
  const clientX = 'touches' in e ? e.touches[0]?.clientX : (e as MouseEvent).clientX
  if (typeof clientX !== 'number')
    return
  updateRect()
  isActive.value = true
  applyLive(posToValue(clientX))
  nextTick(() => handleRef.value?.focus())
  addMoveEnd()
  e.preventDefault()
}
function onMove(e: MouseEvent | TouchEvent) {
  if (!isActive.value)
    return
  const clientX = 'touches' in e ? e.touches[0]?.clientX : (e as MouseEvent).clientX
  if (typeof clientX !== 'number')
    return
  applyLive(posToValue(clientX))
}
function onEnd() {
  if (!isActive.value)
    return
  isActive.value = false
  emit('change', internal.value)
  removeMoveEnd()
}

/** Clavier */
function onKeydown(e: KeyboardEvent) {
  if (props.disabled)
    return
  let delta = 0
  const step = safeStep.value || (range.value / 100)
  switch (e.key) {
    case 'ArrowLeft':
    case 'ArrowDown': delta = -step; break
    case 'ArrowRight':
    case 'ArrowUp': delta = step; break
    case 'PageDown': delta = -step * 10; break
    case 'PageUp': delta = step * 10; break
    case 'Home': applyLive(props.min); emit('change', internal.value); e.preventDefault(); return
    case 'End': applyLive(props.max); emit('change', internal.value); e.preventDefault(); return
    default: return
  }
  applyLive(internal.value + delta)
  emit('change', internal.value)
  e.preventDefault()
}

const ariaValueText = computed(() => props.format(internal.value))
</script>

<template>
  <div
    class="select-none px-2 py-2"
    :class="[props.disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer']"
  >
    <div class="mb-2 flex items-baseline gap-2 text-sm text-gray-700 dark:text-gray-200">
      <span class="tabular-nums">{{ props.min }}{{ unit ? unit : '' }}</span>
      <span class="mx-4 flex-1 rounded-full bg-blue-400/50 text-center font-semibold tabular-nums">
        {{ format(internal) }}{{ unit ? unit : '' }}
      </span>
      <span class="tabular-nums">{{ props.max }}{{ unit ? unit : '' }}</span>
    </div>

    <div
      ref="trackRef"
      class="relative w-full rounded-full transition-colors"
      :class="`${sizeTokens.trackH} ${trackClass}`"
      @mousedown="onTrackPointerDown"
      @touchstart="onTrackPointerDown"
    >
      <!-- Zone pré-min (origin → min) -->
      <div
        class="absolute left-0 top-0 h-full rounded-full"
        :class="preMinClass"
        :style="{ width: `${preMinPercent}%` }"
        aria-hidden="true"
      />
      <!-- Zone active (min → valeur), référentiel [origin..max] -->
      <div
        class="will-change-[left,width] absolute top-0 h-full rounded-full transition-all duration-150 ease-out"
        :class="colorClass"
        :style="{
          left: `${preMinPercent}%`,
          width: `${activeWidthPercent}%`,
        }"
        aria-hidden="true"
      />
      <!-- Handle -->
      <button
        ref="handleRef"
        class="absolute top-1/2 border border-blue-300 rounded-full bg-blue-500 shadow-sm outline-none transition-transform duration-150 ease-out -translate-x-1/2 -translate-y-1/2 dark:border-blue-600 dark:bg-blue-900"
        :class="[
          sizeTokens.handle,
          props.disabled ? 'pointer-events-none' : 'pointer-events-auto',
          (isFocused || isActive) ? `ring ${sizeTokens.ring} ring-offset-2 ring-offset-transparent ring-primary/40` : '',
          colorClass,
        ]"
        type="button"
        role="slider"
        :aria-label="ariaLabel"
        :aria-disabled="props.disabled || undefined"
        :aria-valuemin="props.min"
        :aria-valuemax="props.max"
        :aria-valuenow="internal"
        :aria-valuetext="ariaValueText"
        :style="{ left: `${handleLeftPercent}%` }"
        :tabindex="props.disabled ? -1 : 0"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @keydown="onKeydown"
        @mousedown.stop.prevent="onTrackPointerDown"
        @touchstart.stop.prevent="onTrackPointerDown"
      />
    </div>

    <input v-if="props.name" type="hidden" :name="props.name" :value="internal" aria-hidden="true">
  </div>
</template>
