<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

interface Props {
  /** Valeur actuelle. */
  value: number
  /** Valeur max (>0). */
  max: number
  /** Classe de couleur UnoCSS (fallback si ni xp ni rainbow). */
  color?: string
  /** Thème XP (dégradé + flux). */
  xp?: boolean
  /** Thème rainbow. */
  rainbow?: boolean
  /** Réduit les animations. */
  reduceMotion?: boolean
  /** Durée cible (ms) du tween de barre. */
  tweenMs?: number
  /** Durée (ms) du pulse “gain”. */
  pulseMs?: number
}
const props = withDefaults(defineProps<Props>(), {
  color: 'bg-blue-800',
  xp: false,
  rainbow: false,
  reduceMotion: false,
  tweenMs: 300,
  pulseMs: 400,
})

/** === State / derived =================================================== */
const clampedMax = computed(() => Math.max(0, props.max))
const targetScale = computed<number>(() => {
  if (clampedMax.value === 0) return 0
  return Math.min(1, Math.max(0, props.value / clampedMax.value))
})

/** Valeur affichée, tweenée via rAF (spam-proof). */
const displayScale = ref<number>(targetScale.value)

/** rAF tween controller */
let rafId: number | null = null
let tweenStart = 0
let startScale = displayScale.value

function easeOutCubic(t: number) {
  const u = 1 - t
  return 1 - u * u * u
}
function animateToScale(next: number, duration: number) {
  if (props.reduceMotion || duration <= 0) {
    cancelTween()
    displayScale.value = next
    return
  }
  cancelTween()
  tweenStart = performance.now()
  startScale = displayScale.value
  const dur = Math.max(60, duration) // petite borne basse

  const tick = (now: number) => {
    const t = Math.min(1, (now - tweenStart) / dur)
    const k = easeOutCubic(t)
    displayScale.value = startScale + (next - startScale) * k
    if (t < 1) {
      rafId = requestAnimationFrame(tick)
    } else {
      rafId = null
      displayScale.value = next
    }
  }
  rafId = requestAnimationFrame(tick)
}
function cancelTween() {
  if (rafId != null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

/** Pulse (animation de “gain”) — alternance de nom d’anim pour restart fiable. */
const pulseOn = ref<boolean>(false)
/** Anti‑spam : on regroupe les pulses sur des hausses rapprochées. */
let pulseTimer: number | null = null
const PULSE_COALESCE_MS = 80

function triggerPulse() {
  // alterne le flag pour changer d’animation-name via classe
  pulseOn.value = !pulseOn.value
}

/** Watch valeur pour décider tween + pulse */
let lastValue = props.value
watch(
  () => props.value,
  (val, old) => {
    // Coalesce vers la dernière cible (tween unique malgré spam)
    animateToScale(targetScale.value, props.tweenMs)

    // Pulse seulement si augmentation et thème pulse (xp || rainbow)
    if ((props.xp || props.rainbow) && val > old) {
      if (pulseTimer != null) window.clearTimeout(pulseTimer)
      // On coalesce les pulses trop rapprochés
      pulseTimer = window.setTimeout(() => {
        triggerPulse()
        pulseTimer = null
      }, PULSE_COALESCE_MS)
    }
    lastValue = val
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  cancelTween()
  if (pulseTimer != null) {
    window.clearTimeout(pulseTimer)
    pulseTimer = null
  }
})

/** Classes visuelles */
const barClass = computed(() => {
  if (props.rainbow) return 'rainbow-bar rainbow-aura'
  return props.xp ? 'xp-bar' : props.color!
})

/** A11y */
const ariaNow = computed(() => Math.round(props.value))
</script>

<template>
  <div
    class="relative w-full overflow-hidden rounded h-2 bg-gray-200 dark:bg-gray-700"
    role="progressbar"
    :aria-valuemin="0"
    :aria-valuemax="clampedMax"
    :aria-valuenow="ariaNow"
  >
    <!-- Barre principale transformée (GPU-friendly) -->
    <div
      class="h-full will-change-transform"
      :class="[barClass]"
      :style="{
        transform: `scaleX(${displayScale})`,
        transformOrigin: 'left',
      }"
    />

    <!-- Overlay de pulse (séparé pour éviter d'impacter le transform principal) -->
    <div
      class="pointer-events-none absolute inset-0"
      :class="[
        (props.xp || props.rainbow)
          ? (pulseOn ? 'pulse-a' : 'pulse-b')
          : 'no-pulse'
      ]"
      :style="{
        '--pulse-dur': (props.reduceMotion ? Math.min(props.pulseMs, 200) : props.pulseMs) + 'ms'
      }"
      aria-hidden="true"
    />
  </div>
</template>

<style scoped>
/* ====== Thèmes ========================================================= */
.xp-bar {
  background-image: linear-gradient(90deg, #4ade80, #67e8f9, #4ade80);
  background-size: 200% 100%;
  animation: xp-flow 4s linear infinite;
}
.dark .xp-bar {
  background-image: linear-gradient(90deg, #166534, #0e7490, #166534);
}
.rainbow-bar {
  background: linear-gradient(90deg, #ff0000, #ff9900, #ffff00, #00ff00, #00ffff, #3333ff, #ff00cc);
  background-size: 400% 100%;
  animation: rainbow-shift 5s linear infinite;
}
.rainbow-aura {
  /* Aura légère, plus cheap qu’un gros box-shadow fréquent */
  box-shadow: 0 0 6px 1px rgba(255, 128, 255, 0.45);
}
.dark .rainbow-aura {
  box-shadow: 0 0 6px 1px rgba(255, 128, 255, 0.25);
}

/* ====== Flux continu (optionnel) ====================================== */
@keyframes xp-flow {
  from { background-position: 0% 0%; }
  to   { background-position: -200% 0%; }
}
@keyframes rainbow-shift {
  0%   { background-position:   0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position:   0% 50%; }
}

/* ====== Pulse de gain, spam-proof via alternance d’animation-name ====== */
/* On anime un overlay (box-shadow/scaleY simulé via opacity + inner shadow) pour ne pas perturber le transform principal. */
.pulse-a { animation: pulseGainA var(--pulse-dur) ease; }
.pulse-b { animation: pulseGainB var(--pulse-dur) ease; }
.no-pulse { animation: none; }

@keyframes pulseGainA {
  0%   { box-shadow: inset 0 0 0 0 rgba(250, 204, 21, 0.0); opacity: 0; }
  20%  { opacity: 1; box-shadow: inset 0 0 6px 2px rgba(250, 204, 21, 0.65); }
  100% { opacity: 0; box-shadow: inset 0 0 0 0 rgba(250, 204, 21, 0.0); }
}
@keyframes pulseGainB {
  0%   { box-shadow: inset 0 0 0 0 rgba(250, 204, 21, 0.0); opacity: 0; }
  20%  { opacity: 1; box-shadow: inset 0 0 6px 2px rgba(250, 204, 21, 0.65); }
  100% { opacity: 0; box-shadow: inset 0 0 0 0 rgba(250, 204, 21, 0.0); }
}

/* ====== Perf hints ===================================================== */
div[role="progressbar"] > div:first-child {
  /* couche GPU, évite layout trash sous spam */
  will-change: transform;
  transform: translateZ(0);
}

</style>
