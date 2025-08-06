<script setup lang="ts">
import type { Ball, DexShlagemon } from '~/type'
import { balls as ballData } from '~/data/items/shlageball'
import { toast } from '~/modules/toast'
import { tryCapture } from '~/utils/capture'

const props = defineProps<{ enemy: DexShlagemon | null }>()
const emit = defineEmits<{ (e: 'capture', success: boolean): void }>()

const inventory = useInventoryStore()
const dex = useShlagedexStore()
const audio = useAudioStore()
const { t } = useI18n()
const animBall = ref<string | null>(null)

const availableBalls = computed(() =>
  ballData
    .map(b => ({ ...b, quantity: inventory.items[b.id] || 0 }))
    .filter(b => b.quantity > 0),
)

function useBall(ball: Ball) {
  if (!props.enemy || (inventory.items[ball.id] ?? 0) <= 0)
    return
  animBall.value = ball.animation
  const success = tryCapture(props.enemy, ball)
  inventory.remove(ball.id)
  useTimeoutFn(() => (animBall.value = null), 500)
  if (success) {
    dex.captureEnemy(props.enemy)
    emit('capture', true)
    audio.playSfx('capture-success')
    toast(t('components.battle.CaptureMenu.captured', { name: props.enemy.base.name }))
  }
  else {
    emit('capture', false)
    audio.playSfx('capture-fail')
    toast(t('components.battle.CaptureMenu.fail'))
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
