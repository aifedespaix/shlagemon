<script setup lang="ts">
import type { FloatingEntry } from '~/composables/useFloatingNumbers'

interface Props {
  entries: readonly FloatingEntry[]
  /** Laisse l’animation active mais plus courte si true */
  reduceMotion?: boolean
  /** Durée (ms) de l’anim CSS standard (doit matcher @keyframes) */
  durationMs?: number
}
const props = withDefaults(defineProps<Props>(), {
  reduceMotion: false,
  durationMs: 1200,
})

const emit = defineEmits<{ (e: 'end', id: number): void }>()

/** Fallbacks par id pour éviter les fuites si animationend ne se déclenche pas */
const fallbacks = new Map<number, number>()

function scheduleFallback(id: number) {
  // si reduceMotion, on réduit la durée mais on garde >0 pour garantir un 'end'
  const dur = props.reduceMotion ? Math.min(props.durationMs, 400) : props.durationMs
  clearFallback(id)
  const t = window.setTimeout(() => {
    emit('end', id)
    clearFallback(id)
  }, dur + 50) // petit offset de sécurité
  fallbacks.set(id, t)
}
function clearFallback(id: number) {
  const t = fallbacks.get(id)
  if (t != null) {
    window.clearTimeout(t)
    fallbacks.delete(id)
  }
}

function onAnimEnd(id: number) {
  clearFallback(id)
  emit('end', id)
}

onBeforeUnmount(() => {
  // évite fuites si le composant est démonté en plein feu d’artifice
  fallbacks.forEach(clearTimeout)
  fallbacks.clear()
})
</script>

<template>
  <TransitionGroup
    name="float"
    tag="div"
    class="pointer-events-none relative"
    :css="true"
  >
    <div
      v-for="f in props.entries"
      :key="f.id"
      class="float-chip select-none text-center text-sm font-extrabold drop-shadow"
      :class="[f.kind === 'damage' ? 'text-red-500 damage' : 'text-green-500 heal']"
      :style="{
        '--dx': `${f.dx}px`,
        '--dy': `${f.dy}px`,
        '--rot': `${f.rotation}deg`,
        '--scale': String(f.scale),
        '--dur': (props.reduceMotion ? Math.min(durationMs, 400) : durationMs) + 'ms'
      }"
      @animationstart="scheduleFallback(f.id)"
      @animationend="onAnimEnd(f.id)"
      @animationcancel="onAnimEnd(f.id)"
    >
      {{ f.kind === 'damage' ? '-' : '+' }}{{ f.amount.toLocaleString() }}
    </div>
  </TransitionGroup>
</template>

<style scoped>
.float-chip {
  position: absolute;
  left: 0;
  top: 0;
  transform: translate3d(0,0,0) scale(var(--scale, 1)) rotate(var(--rot, 0deg));
  will-change: transform, opacity;
  text-shadow: 0 1px 0 rgba(0,0,0,.25);
  white-space: nowrap;
  /* dur personnalisable */
  --dur: 2000ms;
}

/* ====== Enter only, on utilise TransitionGroup juste pour la séquence ====== */
.float-enter-active {
  animation: floatDamage var(--dur) cubic-bezier(0.22,0.8,0.22,0.99) both;
}
.float-chip.heal.float-enter-active {
  animation-name: floatHeal ease-in-out;
}

/* On ne fait rien sur leave : suppression instant côté parent */
.float-leave-active,
.float-leave-from,
.float-leave-to {
  animation: none !important;
  transition: none !important;
  opacity: 0 !important;
}
.float-enter-from { opacity: 0; }

@keyframes floatDamage {
  0% {
    opacity: 0;
    transform: translate3d(0,0,0) scale(0) rotate(0deg);
  }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% {
    opacity: 0;
    transform: translate3d(var(--dx), var(--dy), 0) scale(var(--scale)) rotate(var(--rot));
  }
}
@keyframes floatHeal {
  0% {
    opacity: 0;
    transform: translate3d(0,0,0) scale(0.95);
  }
  20% { opacity: 1; }
  100% {
    opacity: 0;
    transform: translate3d(var(--dx), var(--dy), 0) scale(1);
  }
}
/*
@media (prefers-reduced-motion: reduce) {
  .float-enter-active { animation-duration: 400ms; }
  @keyframes floatDamage {
    0% { opacity: 0; transform: translate3d(0,0,0) scale(1) rotate(0deg); }
    100% { opacity: 1; transform: translate3d(0, -4px, 0) scale(1) rotate(0deg); }
  }
  @keyframes floatHeal {
    0% { opacity: 0; transform: translate3d(0,0,0) scale(1); }
    100% { opacity: 1; transform: translate3d(0, 4px, 0) scale(1); }
  }
}*/
</style>
