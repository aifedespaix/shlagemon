<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { onMounted, ref } from 'vue'
import { simpleCapture } from '~/utils/capture'

const props = defineProps<{ target: DexShlagemon }>()
const emit = defineEmits<{ (e: 'finish', success: boolean): void }>()

const shake = ref(0)

function attempt(step: number) {
  shake.value = step
  const success = simpleCapture(props.target)
  if (success) {
    setTimeout(() => emit('finish', true), 500)
  }
  else if (step >= 3) {
    setTimeout(() => emit('finish', false), 500)
  }
  else {
    setTimeout(() => attempt(step + 1), 700)
  }
}

onMounted(() => {
  setTimeout(() => attempt(1), 500)
})
</script>

<template>
  <div class="absolute inset-0 z-20 flex items-center justify-center bg-black/50">
    <div class="relative">
      <img
        src="/items/shlageball/shlageball.png"
        alt="ball"
        class="h-16 w-16" :class="`shake-${shake}`"
      >
      <ShlagemonImage
        :id="target.base.id"
        :alt="target.base.name"
        :shiny="target.isShiny"
        class="absolute left-1/2 top-1/2 h-12 w-12 object-contain -translate-x-1/2 -translate-y-1/2"
        :class="{ 'to-ball': shake > 0 }"
      />
    </div>
  </div>
</template>

<style scoped>
.to-ball {
  animation: capture 0.5s forwards;
}
@keyframes capture {
  to {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
}
.shake-1 {
  animation: shake 0.5s;
}
.shake-2 {
  animation: shake 0.5s;
}
.shake-3 {
  animation: shake 0.5s;
}
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-4px);
  }
  50% {
    transform: translateX(4px);
  }
  75% {
    transform: translateX(-4px);
  }
}
</style>
