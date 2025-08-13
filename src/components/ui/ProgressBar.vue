<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'

/** === Props ============================================================= */
interface Props {
  /** Valeur actuelle. */
  value: number
  /** Valeur max (>= 0). */
  max: number
  /** Classe de couleur UnoCSS (fallback si ni xp ni rainbow). */
  color?: string
  /** Thème XP (dégradé + flux). */
  xp?: boolean
  /** Thème rainbow. */
  rainbow?: boolean
  /** Réduit les animations (préfère un suivi instantané). */
  reduceMotion?: boolean
  /**
   * Constante de temps (ms) du lissage vers la cible.
   * Plus petit = plus réactif. 160–320ms est souvent agréable.
   */
  responseMs?: number
  /** Durée (ms) du pulse “gain”. */
  pulseMs?: number
}
const props = withDefaults(defineProps<Props>(), {
  color: 'bg-blue-800',
  xp: false,
  rainbow: false,
  reduceMotion: false,
  responseMs: 220,
  pulseMs: 400,
})

/** === Helpers =========================================================== */
const clamp01 = (x: number): number => (x < 0 ? 0 : x > 1 ? 1 : x)

/** === Cibles & affichage =============================================== */
const clampedMax = computed<number>(() => Math.max(0, props.max))
const targetScale = computed<number>(() => {
  if (clampedMax.value === 0) return 0
  return clamp01(props.value / clampedMax.value)
})

/** Affiché (suivi lissé temps-continu, spam-proof) */
const displayScale = ref<number>(targetScale.value)

/** === rAF loop (unique) ================================================ */
let rafId: number | null = null
let lastTs = 0

function step(ts: number) {
  if (lastTs === 0) lastTs = ts
  const dt = ts - lastTs
  lastTs = ts

  const desired = targetScale.value

  if (props.reduceMotion) {
    // Pas d’anim : on colle instantanément à la cible
    displayScale.value = desired
  } else {
    // Lissage temps-continu (pas d’overshoot, insensible au spam)
    // gain = 1 - e^(-dt / tau)
    const tau = Math.max(60, props.responseMs) // borne basse pour stabilité
    const gain = 1 - Math.exp(-dt / tau)
    displayScale.value = clamp01(displayScale.value + (desired - displayScale.value) * gain)
  }

  // Continue tant qu’on n’est pas “suffisamment proche” pour éviter jitter
  const epsilon = 0.001
  if (Math.abs(displayScale.value - desired) > epsilon) {
    rafId = requestAnimationFrame(step)
  } else {
    displayScale.value = desired // snap final
    rafId = requestAnimationFrame(step) // on laisse la boucle tourner « idle »
  }
}

function ensureLoop() {
  if (rafId == null) {
    lastTs = 0
    rafId = requestAnimationFrame(step)
  }
}
onMounted(ensureLoop)

onBeforeUnmount(() => {
  if (rafId != null) cancelAnimationFrame(rafId)
  rafId = null
})

/** Redémarrer la boucle si quelque chose change structurellement */
watch([() => props.reduceMotion, () => props.responseMs], () => {
  if (rafId != null) cancelAnimationFrame(rafId)
  rafId = null
  ensureLoop()
})

/** === Pulse (gain uniquement) ========================================== */
const pulseOn = ref<boolean>(false)
let pulseTimer: number | null = null
const PULSE_COALESCE_MS = 80

function triggerPulse() {
  pulseOn.value = !pulseOn.value // alterne l’animation-name
}

watch(
  () => props.value,
  (val, old) => {
    // Pulse seulement sur augmentation ET si thème le permet
    if ((props.xp || props.rainbow) && val > old) {
      if (pulseTimer != null) window.clearTimeout(pulseTimer)
      pulseTimer = window.setTimeout(() => {
        triggerPulse()
        pulseTimer = null
      }, PULSE_COALESCE_MS)
    }
  },
)

onBeforeUnmount(() => {
  if (pulseTimer != null) {
    window.clearTimeout(pulseTimer)
    pulseTimer = null
  }
})

/** === Classes visuelles ================================================= */
const barClass = computed<string>(() => {
  if (props.rainbow) return 'rainbow-bar rainbow-aura'
  return props.xp ? 'xp-bar' : props.color!
})

/** === A11y ============================================================= */
const ariaNow = computed<number>(() => Math.round(props.value))
</script>

<template>
  <div
    class="relative w-full overflow-hidden rounded h-2 bg-gray-200 dark:bg-gray-700"
    role="progressbar"
    :aria-valuemin="0"
    :aria-valuemax="clampedMax"
    :aria-valuenow="ariaNow"
  >
    <!-- Barre principale (transform GPU-friendly) -->
    <div
      class="h-full will-change-transform"
      :class="[barClass]"
      :style="{
        transform: `scaleX(${displayScale})`,
        transformOrigin: 'left',
      }"
    />

    <!-- Overlay pulse (séparé du transform) -->
    <div
      class="pointer-events-none absolute inset-0"
      :class="[(props.xp || props.rainbow) ? (pulseOn ? 'pulse-a' : 'pulse-b') : 'no-pulse']"
      :style="{ '--pulse-dur': (props.reduceMotion ? Math.min(props.pulseMs, 200) : props.pulseMs) + 'ms' }"
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
.rainbow-aura { box-shadow: 0 0 6px 1px rgba(255, 128, 255, 0.45); }
.dark .rainbow-aura { box-shadow: 0 0 6px 1px rgba(255, 128, 255, 0.25); }

/* ====== Flux continu optionnel ======================================== */
@keyframes xp-flow {
  from { background-position: 0% 0%; }
  to   { background-position: -200% 0%; }
}
@keyframes rainbow-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* ====== Pulse de gain (spam-proof) ==================================== */
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
  will-change: transform;
  transform: translateZ(0);
}
</style>
