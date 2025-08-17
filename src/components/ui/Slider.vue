<script setup lang="ts">
import { useElementBounding, useEventListener, useFocus, useVModel } from '@vueuse/core'

type Size = 'sm' | 'md' | 'lg'

interface Props {
  /** v-model */
  modelValue: number
  /** Borne min (incluse). */
  min?: number
  /** Borne max (incluse). */
  max?: number
  /** Pas (>=0). 0 → continu. */
  step?: number
  /** Désactivation. */
  disabled?: boolean
  /** Taille visuelle. */
  size?: Size
  /** Classe couleur (UnoCSS) de la zone active [min→valeur]. */
  colorClass?: string
  /** Classe de la piste générale. */
  trackClass?: string
  /** Classe de la zone pré-min [origin→min]. */
  preMinClass?: string
  /** Origine visuelle (référentiel du track). */
  origin?: number
  /** Name pour le <input hidden>. */
  name?: string
  /** ARIA label du slider. */
  ariaLabel?: string
  /** Suffixe d’unité. */
  unit?: string
  /** Format d’affichage de la valeur centrale. */
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
  /** v-model */
  (e: 'update:modelValue', v: number): void
  /** Émission live pendant drag/clavier/boutons */
  (e: 'input', v: number): void
  /** Commit final (fin de drag, touche, clic ±) */
  (e: 'change', v: number): void
}>()

/** === State ============================================================= */
const trackRef = ref<HTMLDivElement | null>(null)
const handleRef = ref<HTMLButtonElement | null>(null)

/** v-model contrôlé via VueUse */
const internal = useVModel(props, 'modelValue', emit)

/** bounding rect réactif */
const { left, width } = useElementBounding(trackRef)

/** focus handle */
const { focused: isFocused } = useFocus(handleRef)

const isActive = ref(false)

/** === Utils ============================================================= */
const safeStep = computed<number>(() => Math.max(0, props.step))
const range = computed<number>(() => Math.max(0, props.max - props.min))
const visualSpan = computed<number>(() => Math.max(1e-6, props.max - props.origin))

const clamp = (v: number): number => Math.min(props.max, Math.max(props.min, v))
function snap(v: number): number {
  if (safeStep.value <= 0)
    return clamp(v)
  const n = Math.round((v - props.min) / safeStep.value)
  return clamp(props.min + n * safeStep.value)
}

/** mapping pointeur -> valeur */
function posToValue(clientX: number): number {
  if (!width.value)
    return internal.value
  const ratio = (clientX - left.value) / width.value
  return snap(props.origin + ratio * visualSpan.value)
}

/** set helpers (lisibles) */
function setLive(v: number): void {
  const next = snap(clamp(v))
  if (next !== internal.value) {
    internal.value = next // -> émet update:modelValue via useVModel
    emit('input', next) // live
  }
}
function commit(): void {
  emit('change', internal.value) // commit final
}

/** % pour le track (référentiel [origin..max]) */
const preMinPercent = computed<number>(() =>
  props.min <= props.origin ? 0 : ((props.min - props.origin) / visualSpan.value) * 100,
)
const handleLeftPercent = computed<number>(() => {
  const posFromOrigin = Math.min(props.max, Math.max(props.origin, internal.value)) - props.origin
  return (posFromOrigin / visualSpan.value) * 100
})
const activeWidthPercent = computed<number>(() =>
  Math.max(0, handleLeftPercent.value - preMinPercent.value),
)

/** tokens taille */
const sizeTokens = computed((): Readonly<{
  trackH: string
  handle: string
  ring: string
  btnPad: string
  btnText: string
}> => {
  switch (props.size) {
    case 'sm': return { trackH: 'h-1.5', handle: 'h-4 w-4', ring: 'ring-2', btnPad: 'px-2 py-1', btnText: 'text-sm' } as const
    case 'lg': return { trackH: 'h-3', handle: 'h-6 w-6', ring: 'ring-3', btnPad: 'px-3 py-2', btnText: 'text-base' } as const
    default: return { trackH: 'h-2', handle: 'h-5 w-5', ring: 'ring-2', btnPad: 'px-2.5 py-1.5', btnText: 'text-sm' } as const
  }
})

/** boutons ± : change ici pour ±1 si tu veux */
const buttonDelta = computed<number>(() => safeStep.value || 1)
const canDecrement = computed<boolean>(() => !props.disabled && internal.value > props.min)
const canIncrement = computed<boolean>(() => !props.disabled && internal.value < props.max)

function onMinus(): void {
  if (!canDecrement.value)
    return
  setLive(internal.value - buttonDelta.value)
  commit()
}
function onPlus(): void {
  if (!canIncrement.value)
    return
  setLive(internal.value + buttonDelta.value)
  commit()
}

/** drag piste */
function startDrag(clientX?: number): void {
  if (props.disabled)
    return
  if (clientX == null || Number.isNaN(clientX))
    return
  isActive.value = true
  setLive(posToValue(clientX))
  nextTick(() => handleRef.value?.focus())
}
function stopDrag(): void {
  if (!isActive.value)
    return
  isActive.value = false
  commit()
}
function onMove(e: MouseEvent | TouchEvent): void {
  if (!isActive.value)
    return
  const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX
  if (typeof clientX === 'number')
    setLive(posToValue(clientX))
}
useEventListener(window, 'mousemove', onMove, { passive: true })
useEventListener(window, 'touchmove', onMove, { passive: true })
useEventListener(window, 'mouseup', stopDrag, { passive: true })
useEventListener(window, 'touchend', stopDrag, { passive: true })
useEventListener(window, 'touchcancel', stopDrag, { passive: true })

/** clavier */
function onKeydown(e: KeyboardEvent): void {
  if (props.disabled)
    return
  let delta = 0
  const step = safeStep.value || (range.value / 100)
  switch (e.key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      delta = -step
      break
    case 'ArrowRight':
    case 'ArrowUp':
      delta = step
      break
    case 'PageDown':
      delta = -step * 10
      break
    case 'PageUp':
      delta = step * 10
      break
    case 'Home':
      setLive(props.min)
      commit()
      e.preventDefault()
      return
    case 'End':
      setLive(props.max)
      commit()
      e.preventDefault()
      return
    default:
      return
  }
  setLive(internal.value + delta)
  commit()
  e.preventDefault()
}

const ariaValueText = computed(() => props.format(internal.value))
</script>

<template>
  <div class="select-none" :class="[props.disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer']">
    <!-- Labels -->
    <div class="mb-2 flex items-baseline gap-2 text-sm text-gray-700 dark:text-gray-200">
      <span class="tabular-nums">{{ props.min }}{{ unit }}</span>
      <span class="mx-4 flex-1 rounded-full bg-blue-400/50 text-center font-semibold tabular-nums">
        {{ format(internal) }}{{ unit }}
      </span>
      <span class="tabular-nums">{{ props.max }}{{ unit }}</span>
    </div>

    <!-- Ligne principale -->
    <div class="flex items-center gap-1">
      <!-- − -->
      <!-- Explicit button type prevents unintended form submission when slider sits inside a form -->
      <UiButton
        type="button"
        :disabled="!canDecrement"
        size="xs"
        :aria-label="`Diminuer de ${buttonDelta} (${format(snap(internal - buttonDelta))}${unit})`"
        :title="`−${buttonDelta} (${format(snap(internal - buttonDelta))}${unit})`"
        class="border border-gray-300 rounded-md bg-gray-1 transition-colors dark:border-gray-700 dark:bg-gray-9 hover:bg-gray-2 dark:hover:bg-gray-8"
        :class="[sizeTokens.btnPad, sizeTokens.btnText]"
        @click="onMinus"
      >
        −
      </UiButton>

      <!-- Track -->
      <div
        ref="trackRef"
        class="relative w-full rounded-full transition-colors"
        :class="`${sizeTokens.trackH} ${trackClass}`"
        @mousedown="(e: MouseEvent) => startDrag(e.clientX)"
        @touchstart="(e: TouchEvent) => startDrag(e.touches[0]?.clientX)"
      >
        <!-- pre-min -->
        <div
          class="absolute left-0 top-0 h-full rounded-full"
          :class="preMinClass"
          :style="{ width: `${preMinPercent}%` }"
          aria-hidden="true"
        />
        <!-- active -->
        <div
          class="absolute top-0 h-full rounded-full transition-all duration-150 ease-out"
          :class="colorClass"
          :style="{ left: `${preMinPercent}%`, width: `${activeWidthPercent}%` }"
          aria-hidden="true"
        />
        <!-- Handle -->
        <button
          ref="handleRef"
          class="absolute top-1/2 border rounded-full shadow-sm outline-none transition-transform duration-150 ease-out -translate-x-1/2 -translate-y-1/2"
          :class="[
            sizeTokens.handle,
            props.disabled ? 'pointer-events-none' : 'pointer-events-auto',
            (isFocused || isActive) ? `ring ${sizeTokens.ring} ring-offset-2 ring-primary/40` : '',
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
          @keydown="onKeydown"
        />
      </div>

      <!-- + -->
      <!-- Explicit button type prevents unintended form submission when slider sits inside a form -->
      <UiButton
        type="button"
        :disabled="!canIncrement"
        size="xs"
        :aria-label="`Augmenter de ${buttonDelta} (${format(snap(internal + buttonDelta))}${unit})`"
        :title="`+${buttonDelta} (${format(snap(internal + buttonDelta))}${unit})`"
        class="border border-gray-300 rounded-md bg-gray-1 transition-colors dark:border-gray-700 dark:bg-gray-9 hover:bg-gray-2 dark:hover:bg-gray-8"
        :class="[sizeTokens.btnPad, sizeTokens.btnText]"
        @click="onPlus"
      >
        +
      </UiButton>
    </div>

    <input v-if="props.name" type="hidden" :name="props.name" :value="internal" aria-hidden="true">
  </div>
</template>
