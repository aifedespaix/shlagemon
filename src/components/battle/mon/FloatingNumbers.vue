<script setup lang="ts">
import type { FloatingEntry } from '~/composables/useFloatingNumbers'

interface Props {
  entries: readonly FloatingEntry[]
  reduceMotion?: boolean
}
const props = withDefaults(defineProps<Props>(), { reduceMotion: false })
const emit = defineEmits<{ (e: 'end', id: number): void }>()
function onEnd(id: number) {
  emit('end', id)
}
</script>

<template>
  <TransitionGroup
    name="float"
    tag="div"
    class="pointer-events-none relative"
    :css="!props.reduceMotion"
  >
    <div
      v-for="f in props.entries"
      :key="f.id"
      class="float-chip select-none text-center text-sm font-extrabold drop-shadow"
      :class="[f.kind === 'damage' ? 'text-red-500 damage' : 'text-green-500 heal']"
      :style="{ '--dx': `${f.dx}px`, '--dy': `${f.dy}px`, '--rot': `${f.rotation}deg`, '--scale': f.scale.toString() }"
      @animationend="onEnd(f.id)"
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
  filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.25));
  white-space: nowrap;
  transform: translate(0, 0) scale(var(--scale, 1)) rotate(var(--rot, 0deg));
}
.float-enter-active {
  animation: floatDamage 0.9s cubic-bezier(0.22, 0.8, 0.22, 0.99) both;
}
.float-chip.heal.float-enter-active {
  animation-name: floatHeal;
}
.float-leave-active,
.float-leave-from,
.float-leave-to {
  animation: none !important;
  transition: none !important;
  opacity: 0 !important;
}
.float-enter-from {
  opacity: 0;
}
@keyframes floatDamage {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0) rotate(0deg);
    filter: blur(0.3px);
  }
  20% {
    opacity: 1;
    filter: blur(0);
  }
  100% {
    opacity: 0;
    transform: translate(var(--dx), var(--dy)) scale(var(--scale)) rotate(var(--rot));
  }
}
@keyframes floatHeal {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.95);
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(var(--dx), var(--dy)) scale(1);
  }
}
@media (prefers-reduced-motion: reduce) {
  .float-enter-active {
    animation-duration: 0.3s;
  }
  @keyframes floatDamage {
    0% {
      opacity: 0;
      transform: translate(0, 0) scale(1) rotate(0deg);
    }
    100% {
      opacity: 1;
      transform: translate(0, -8px) scale(1) rotate(0deg);
    }
  }
  @keyframes floatHeal {
    0% {
      opacity: 0;
      transform: translate(0, 0) scale(1);
    }
    100% {
      opacity: 1;
      transform: translate(0, 8px) scale(1);
    }
  }
}
</style>
