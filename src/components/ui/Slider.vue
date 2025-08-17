<script setup lang="ts">
import { useFocus, useVModel } from '@vueuse/core'
import { computed, ref } from 'vue'

type Size = 'sm' | 'md' | 'lg'

interface Props {
  /** v-model */
  modelValue: number
  /** Borne min (incluse). */
  min?: number
  /** Borne max (incluse). */
  max?: number
  /** Pas (>=0). 0 → continu (step="any"). */
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
const rangeRef = ref<HTMLInputElement | null>(null)
const internal = useVModel(props, 'modelValue', emit)
const { focused: isFocused } = useFocus(rangeRef)

/** === Utils ============================================================= */
const clamp = (v: number): number => Math.min(props.max, Math.max(props.min, v))
const safeStep = computed<number>(() => Math.max(0, props.step))
const visualSpan = computed<number>(() => Math.max(1e-6, props.max - props.origin))

/** Delta pour boutons quand step=0 → delta “continu” cohérent */
const buttonDelta = computed<number>(() => safeStep.value || Math.max((props.max - props.min) / 100, 0.000001))

/** Snap utilisé par les boutons (+/-). Le natif gère déjà step pour le clavier/souris. */
function snap(v: number): number {
  if (safeStep.value <= 0) return clamp(v)
  const n = Math.round((v - props.min) / safeStep.value)
  return clamp(props.min + n * safeStep.value)
}

/** === Pourcentages de décor (pré-min + actif) =========================== */
const preMinPercent = computed<number>(() => {
  const from = Math.max(props.origin, Math.min(props.min, props.max))
  const num = from - props.origin
  return Math.min(100, Math.max(0, (num / visualSpan.value) * 100))
})
const valuePercent = computed<number>(() => {
  const posFromOrigin = Math.min(props.max, Math.max(props.origin, internal.value)) - props.origin
  return Math.min(100, Math.max(0, (posFromOrigin / visualSpan.value) * 100))
})
const activeWidthPercent = computed<number>(() => Math.max(0, valuePercent.value - preMinPercent.value))

/** === Taille (tokens) =================================================== */
/** On fournit à la fois des classes Uno (purgeables) et les rem numériques pour centrer le thumb. */
const sizeTokens = computed((): Readonly<{
  trackHClass: string
  trackHRem: number
  thumbRem: number
  btnPad: string
  btnText: string
}> => {
  switch (props.size) {
    case 'sm':
      return { trackHClass: 'h-1.5', trackHRem: 0.375, thumbRem: 1.0, btnPad: 'px-2 py-1', btnText: 'text-sm' } as const
    case 'lg':
      return { trackHClass: 'h-3', trackHRem: 0.75, thumbRem: 1.5, btnPad: 'px-3 py-2', btnText: 'text-base' } as const
    default:
      return { trackHClass: 'h-2', trackHRem: 0.5, thumbRem: 1.25, btnPad: 'px-2.5 py-1.5', btnText: 'text-sm' } as const
  }
})

/** === Handlers ========================================================== */
function onRangeInput(e: Event): void {
  const el = e.target as HTMLInputElement
  const next = clamp(Number(el.value))
  if (next !== internal.value) {
    internal.value = next
    emit('input', next)
  }
}
function onRangeChange(): void {
  emit('change', internal.value)
}
function onMinus(): void {
  if (props.disabled) return
  const next = snap(internal.value - buttonDelta.value)
  if (next !== internal.value) {
    internal.value = next
    emit('input', next)
    emit('change', next)
  }
}
function onPlus(): void {
  if (props.disabled) return
  const next = snap(internal.value + buttonDelta.value)
  if (next !== internal.value) {
    internal.value = next
    emit('input', next)
    emit('change', next)
  }
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
      <UiButton
        native-type="button"
        :disabled="props.disabled || internal <= props.min"
        size="xs"
        :aria-label="`Diminuer de ${buttonDelta} (${format(snap(internal - buttonDelta))}${unit})`"
        :title="`−${buttonDelta} (${format(snap(internal - buttonDelta))}${unit})`"
        class="border border-gray-300 rounded-md bg-gray-1 transition-colors dark:border-gray-700 dark:bg-gray-9 hover:bg-gray-2 dark:hover:bg-gray-8"
        :class="[sizeTokens.btnPad, sizeTokens.btnText]"
        @click="onMinus"
      >
        −
      </UiButton>

      <!-- Track habillée + input natif limité à la zone interactive -->
      <div
        class="relative w-full"
        :class="sizeTokens.trackHClass"
        :style="{
          '--track-h': `${sizeTokens.trackHRem}rem`,
          '--thumb-h': `${sizeTokens.thumbRem}rem`,
        }"
      >
        <!-- piste de fond -->
        <div class="absolute inset-y-0 left-0 w-full rounded-full" :class="trackClass" aria-hidden="true" />
        <!-- pré-min (non diminuable) -->
        <div
          class="absolute inset-y-0 left-0 rounded-full"
          :class="preMinClass"
          :style="{ width: `${preMinPercent}%` }"
          aria-hidden="true"
        />
        <!-- actif [min→valeur] -->
        <div
          class="absolute inset-y-0 rounded-full transition-all duration-150 ease-out"
          :class="colorClass"
          :style="{ left: `${preMinPercent}%`, width: `${activeWidthPercent}%` }"
          aria-hidden="true"
        />

        <!-- Input range limité à [min→max] → commence après la zone pré-min -->
        <input
          ref="rangeRef"
          type="range"
          class="range-native absolute inset-y-0 bg-transparent cursor-pointer w-auto"
          :style="{ left: `${preMinPercent}%`, width: `${100 - preMinPercent}%` }"
          :min="props.min"
          :max="props.max"
          :step="safeStep || 'any'"
          :disabled="props.disabled"
          :value="internal"
          :aria-label="ariaLabel"
          :aria-valuetext="ariaValueText"
          @input="onRangeInput"
          @change="onRangeChange"
        />
      </div>

      <!-- + -->
      <UiButton
        native-type="button"
        :disabled="props.disabled || internal >= props.max"
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

<style scoped>
/* ============================================================
   Thumb natif, centré à 100% grâce aux variables:
   --track-h : hauteur de piste (rem)
   --thumb-h : hauteur du thumb (rem)
   margin-top = (track - thumb) / 2
   ============================================================ */

/* WebKit / Blink */
.range-native::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  border-radius: 9999px;
  border: 2px solid transparent;
  background: currentColor; /* hérite de la couleur de texte du range */
  box-shadow: 0 1px 2px rgba(0,0,0,.25);
  transition: transform .15s ease-out, box-shadow .15s ease-out;
  cursor: grab;

  width: var(--thumb-h, 1.25rem);
  height: var(--thumb-h, 1.25rem);

  /* ✅ centrage vertical exact */
  margin-top: calc((var(--track-h, 0.5rem) - var(--thumb-h, 1.25rem)) / 2);
}

/* Firefox */
.range-native::-moz-range-thumb {
  border: none;
  border-radius: 9999px;
  background: currentColor;
  box-shadow: 0 1px 2px rgba(0,0,0,.25);
  transition: transform .15s ease-out, box-shadow .15s ease-out;
  cursor: grab;

  width: var(--thumb-h, 1.25rem);
  height: var(--thumb-h, 1.25rem);

  /* Firefox centre déjà correctement le thumb sur la track */
  margin-top: 0;
}

/* Piste native invisible (on affiche nos calques dessous) */
.range-native::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  height: var(--track-h, 0.5rem);
}
.range-native::-moz-range-track {
  background: transparent;
  height: var(--track-h, 0.5rem);
}

/* États d'interaction */
.range-native:focus-visible::-webkit-slider-thumb {
  outline: none;
  box-shadow:
    0 0 0 3px rgba(59, 130, 246, .35),
    0 1px 2px rgba(0,0,0,.25);
  transform: scale(1.02);
}
.range-native:focus-visible::-moz-range-thumb {
  outline: none;
  box-shadow:
    0 0 0 3px rgba(59, 130, 246, .35),
    0 1px 2px rgba(0,0,0,.25);
  transform: scale(1.02);
}
.range-native:active::-webkit-slider-thumb,
.range-native:active::-moz-range-thumb {
  transform: scale(1.08);
}

/* Désactivé */
.range-native:disabled { cursor: not-allowed; }
.range-native:disabled::-webkit-slider-thumb,
.range-native:disabled::-moz-range-thumb {
  opacity: .6;
}
</style>
