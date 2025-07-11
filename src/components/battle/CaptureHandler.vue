<script setup lang="ts">
import type { DexShlagemon } from '~/type'
import { computed, ref } from 'vue'
import { balls } from '~/data/items/shlageball'
import { useAudioStore } from '~/stores/audio'
import { useBallStore } from '~/stores/ball'
import { useCaptureLimitModalStore } from '~/stores/captureLimitModal'
import { useInventoryStore } from '~/stores/inventory'
import { usePlayerStore } from '~/stores/player'
import { ballHues } from '~/utils/ball'
import { tryCapture } from '~/utils/capture'

const props = defineProps<{ enemy: DexShlagemon | null, enemyHp: number, stopBattle: () => void }>()
const emit = defineEmits<{ (e: 'finish', success: boolean): void }>()

const inventory = useInventoryStore()
const ballStore = useBallStore()
const player = usePlayerStore()
const captureLimitModal = useCaptureLimitModalStore()
const audio = useAudioStore()

const showCapture = ref(false)
const captureBall = ref(balls[0])
const shake = ref(0)

const captureButtonDisabled = computed(() =>
  (inventory.items[ballStore.current] || 0) <= 0 || props.enemyHp <= 0,
)

const captureButtonTooltip = computed(() => {
  if ((inventory.items[ballStore.current] || 0) <= 0)
    return 'Pas de Schlagéball, capture impossible'
  if (props.enemyHp <= 0)
    return 'Impossible de capturer un Shlagémon K.O.'
  if (props.enemy && props.enemy.lvl > player.captureLevelCap)
    return 'Un badge est nécessaire pour capturer ce niveau'
  return 'Capturer le Shlagémon'
})

function attempt(step: number) {
  shake.value = step
  if (!props.enemy)
    return
  const success = tryCapture(props.enemy, captureBall.value)
  if (success)
    setTimeout(() => finish(true), 500)
  else if (step >= 3)
    setTimeout(() => finish(false), 500)
  else
    setTimeout(() => attempt(step + 1), 700)
}

function openCapture() {
  const id = ballStore.current
  if (!props.enemy || (inventory.items[id] || 0) <= 0 || props.enemyHp <= 0)
    return
  if (props.enemy.lvl > player.captureLevelCap) {
    captureLimitModal.open(props.enemy.lvl)
    return
  }
  inventory.remove(id)
  captureBall.value = balls.find(b => b.id === id) || balls[0]
  props.stopBattle()
  showCapture.value = true
  shake.value = 0
  audio.playSfx('/audio/sfx/capture-start.ogg')
  setTimeout(() => attempt(1), 500)
}

function finish(success: boolean) {
  showCapture.value = false
  emit('finish', success)
}
</script>

<template>
  <div>
    <Button
      class="absolute right-50% top-12 aspect-square h-12 w-12 flex flex-col translate-x-1/2 cursor-pointer items-center gap-2 rounded-full text-xs"
      :class="{ ' cursor-not-allowed saturate-0': captureButtonDisabled }"
      :disabled="captureButtonDisabled"
      @click="openCapture"
    >
      <Tooltip :text="captureButtonTooltip">
        <ImageByBackground
          src="/items/shlageball/shlageball.png"
          alt="capture"
          class="h-8 w-8 cursor-pointer"
          :style="{ filter: `hue-rotate(${ballHues[ballStore.current]})` }"
        />
      </Tooltip>
    </Button>
    <div
      v-if="showCapture && enemy"
      class="absolute inset-0 z-20 flex items-center justify-center bg-black/50"
    >
      <div class="relative">
        <img
          :src="captureBall.image"
          alt="ball"
          class="h-16 w-16"
          :style="{ filter: `hue-rotate(${captureBall.id ? ballHues[captureBall.id] : '0deg'})` }"
          :class="`shake-${shake}`"
        >
        <ShlagemonImage
          :id="enemy.base.id"
          :alt="enemy.base.name"
          :shiny="enemy.isShiny"
          class="absolute left-1/2 top-1/2 h-12 w-12 object-contain -translate-x-1/2 -translate-y-1/2"
          :class="{ 'to-ball': shake > 0 }"
        />
      </div>
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
