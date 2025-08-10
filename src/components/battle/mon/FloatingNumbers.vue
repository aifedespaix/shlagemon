<script setup lang="ts">
interface FloatingEntry {
  id: number
  amount: number
  kind: 'damage' | 'heal'
  dx: number
  dy: number
  rotation: number
}
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
    name="float-dmg"
    tag="div"
    class="pointer-events-none relative"
    :css="!props.reduceMotion"
  >
    <div
      v-for="f in props.entries"
      :key="f.id"
      class="float-chip select-none text-center text-sm font-extrabold drop-shadow"
      :class="[f.kind === 'damage' ? 'text-red-500' : 'text-green-500']"
      :style="{ '--dx': `${f.dx}px`, '--dy': `${f.dy}px`, '--rot': `${f.rotation}deg` }"
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
  transform: translate(0, 0) rotate(var(--rot, 0deg));
}
.float-dmg-enter-active {
  animation: floatRise 0.9s cubic-bezier(0.22, 0.8, 0.22, 0.99) both;
}
.float-dmg-leave-active,
.float-dmg-leave-from,
.float-dmg-leave-to {
  animation: none !important;
  transition: none !important;
  opacity: 0 !important;
}
.float-dmg-enter-from {
  opacity: 0;
}
@keyframes floatRise {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.95) rotate(var(--rot, 0deg));
    filter: blur(0.3px);
  }
  20% {
    opacity: 1;
    transform: translate(calc(var(--dx) * 0.2), calc(var(--dy) * 0.2)) scale(1) rotate(var(--rot, 0deg));
    filter: blur(0);
  }
  100% {
    opacity: 0;
    transform: translate(var(--dx), var(--dy)) scale(1) rotate(var(--rot, 0deg));
  }
}
@media (prefers-reduced-motion: reduce) {
  .float-dmg-enter-active {
    animation-duration: 0.3s;
  }
  @keyframes floatRise {
    0% {
      opacity: 0;
      transform: translate(0, 0);
    }
    100% {
      opacity: 1;
      transform: translate(0, -8px);
    }
  }
}
</style>
