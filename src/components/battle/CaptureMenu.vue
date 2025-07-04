<script setup lang="ts">
import type { Ball, DexShlagemon } from '~/type'
import { computed, ref } from 'vue'
import { toast } from 'vue3-toastify'
import { balls as ballData } from '~/data/items/shlageball'
import { useInventoryStore } from '~/stores/inventory'
import { useShlagedexStore } from '~/stores/shlagedex'
import { tryCapture } from '~/utils/capture'

const props = defineProps<{ enemy: DexShlagemon | null }>()
const emit = defineEmits<{ (e: 'capture', success: boolean): void }>()

const inventory = useInventoryStore()
const dex = useShlagedexStore()
const animBall = ref<string | null>(null)

const availableBalls = computed(() =>
  ballData
    .map(b => ({ ...b, quantity: inventory.items[b.id] || 0 }))
    .filter(b => b.quantity > 0),
)

function useBall(ball: Ball) {
  if (!props.enemy || inventory.items[ball.id] <= 0)
    return
  animBall.value = ball.animation
  const success = tryCapture(props.enemy, ball)
  inventory.remove(ball.id)
  setTimeout(() => (animBall.value = null), 500)
  if (success) {
    dex.captureEnemy(props.enemy)
    emit('capture', true)
    toast(`Vous avez capturé ${props.enemy.base.name} !`)
  }
  else {
    emit('capture', false)
    toast('Raté !')
  }
}
</script>

<template>
  <div class="relative mt-2 flex justify-center gap-2">
    <div
      v-for="ball in availableBalls"
      :key="ball.id"
      class="flex flex-col items-center"
    >
      <img
        :src="ball.animation"
        :alt="ball.name"
        class="h-8 w-8 cursor-pointer"
        @click="useBall(ball)"
      >
      <span class="text-xs">x{{ ball.quantity }}</span>
    </div>
    <img
      v-if="animBall"
      :src="animBall"
      alt=""
      class="ball-anim absolute left-1/2 top-0 h-8 w-8 -translate-x-1/2"
    >
  </div>
</template>

<style scoped>
.ball-anim {
  animation: throw 0.5s ease;
}
@keyframes throw {
  0% {
    transform: translate(-50%, 0) scale(1);
  }
  50% {
    transform: translate(-50%, -1.5rem) scale(1.2);
  }
  100% {
    transform: translate(-50%, 0) scale(1);
  }
}
</style>
