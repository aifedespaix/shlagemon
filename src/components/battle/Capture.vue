<script setup lang="ts">
import type { DexShlagemon } from '~/type'
import { balls } from '~/data/items/shlageball'
import { ballHues } from '~/utils/ball'
import { getCaptureChance, tryCapture } from '~/utils/capture'

const props = defineProps<{ enemy: DexShlagemon | null, enemyHp: number, playerHp: number, stopBattle: () => void }>()
const emit = defineEmits<{ (e: 'finished', success: boolean): void }>()

const inventory = useInventoryStore()
const ballStore = useBallStore()
const player = usePlayerStore()
const captureLimitModal = useCaptureLimitModalStore()
const audio = useAudioStore()
const dex = useShlagedexStore()
const { t } = useI18n()

const capturedEnemy = ref<DexShlagemon | null>(null)

const showCapture = ref(false)
const captureBall = ref(balls[0])
const shake = ref(0)

const captureCooldown = ref(false)

const currentBallHue = computed(() => ballStore.current ? ballHues[ballStore.current] : '0deg')
const currentBallCount = computed(() => ballStore.current ? inventory.items[ballStore.current] ?? 0 : 0)

const captureChance = computed(() => {
  const id = ballStore.current
  if (!props.enemy || !id)
    return 0
  const ball = balls.find(b => b.id === id)
  if (!ball)
    return 0
  return getCaptureChance(props.enemy, ball)
})

const captureAnimationClass = computed(() => {
  if (captureChance.value <= 0)
    return 'opacity-50 discourage'
  if (captureChance.value > 50)
    return 'animate-bounce'
  return ''
})

const captureButtonDisabled = computed(() =>
  captureCooldown.value
  || currentBallCount.value <= 0
  || props.enemyHp <= 0
  || props.playerHp <= 0,
)

const captureButtonTooltip = computed(() => {
  if (captureCooldown.value)
    return t('components.battle.Capture.cooldown')
  if (currentBallCount.value <= 0)
    return t('components.battle.Capture.noBall')
  if (props.playerHp <= 0)
    return t('components.battle.Capture.playerKo')
  if (props.enemyHp <= 0)
    return t('components.battle.Capture.ko')
  if (props.enemy && props.enemy.lvl > player.captureLevelCap)
    return t('components.battle.Capture.needBadge')
  return t('components.battle.Capture.capture')
})

function attempt(step: number) {
  shake.value = step
  if (!props.enemy)
    return
  const success = tryCapture(props.enemy, captureBall.value)
  if (success)
    useTimeoutFn(() => finish(true), 500)
  else if (step >= 3)
    useTimeoutFn(() => finish(false), 500)
  else
    useTimeoutFn(() => attempt(step + 1), 700)
}

function open() {
  const id = ballStore.current
  if (!id || !props.enemy || currentBallCount.value <= 0 || props.enemyHp <= 0 || props.playerHp <= 0)
    return
  if (props.enemy.lvl > player.captureLevelCap) {
    captureLimitModal.open(props.enemy.lvl)
    return
  }
  capturedEnemy.value = props.enemy
  inventory.remove(id)
  captureBall.value = balls.find(b => b.id === id) || balls[0]
  props.stopBattle()
  showCapture.value = true
  shake.value = 0
  audio.playSfx('capture-start')
  useTimeoutFn(() => attempt(1), 500)
}

function finish(success: boolean) {
  showCapture.value = false
  audio.playSfx(success ? 'capture-success' : 'capture-fail')
  if (success && capturedEnemy.value)
    dex.captureEnemy(capturedEnemy.value)
  capturedEnemy.value = null
  emit('finished', success)
  if (success) {
    captureCooldown.value = true
    useTimeoutFn(() => (captureCooldown.value = false), 1000)
  }
}

defineExpose({ open })
</script>

<template>
  <div>
    <div
      class="absolute right-50% top-15 translate-x-1/2"
      sm="top-13"
    >
      <UiTooltip
        :text="captureButtonTooltip"
        as-button
        class="flex flex-col items-center gap-2 text-xs"
        :class="captureButtonDisabled ? 'cursor-not-allowed saturate-0 pointer-events-none' : 'cursor-pointer'"
        @click="!captureButtonDisabled && open()"
        @keydown.enter.prevent="!captureButtonDisabled && open()"
        @keydown.space.prevent="!captureButtonDisabled && open()"
      >
        <UiImageByBackground
          src="/items/shlageball/shlageball.webp"
          alt="capture"
          class="h-8 w-8 md:h-10 md:w-10"
          :class="captureAnimationClass"
          :style="{ filter: `hue-rotate(${currentBallHue})` }"
        />
      </UiTooltip>
    </div>
    <div
      v-if="showCapture && enemy"
      class="absolute inset-0 z-20 flex items-center justify-center bg-black/50 dark:bg-black/70"
    >
      <div class="relative">
        <img
          :src="captureBall.image"
          alt="ball"
          class="h-16 w-16"
          :style="{ filter: `hue-rotate(${captureBall.id ? ballHues[captureBall.id] : '0deg'})` }"
          :class="`shake-${shake}`"
          md="h-20 w-20"
        >
        <ShlagemonImage
          :id="enemy.base.id"
          :alt="enemy.base.name"
          :shiny="enemy.isShiny"
          class="absolute left-1/2 top-1/2 h-12 w-12 object-contain -translate-x-1/2 -translate-y-1/2"
          :class="{ 'to-ball': shake > 0 }"
          md="h-16 w-16"
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

.discourage {
  animation: discourage 1s ease-in-out infinite;
}
@keyframes discourage {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(4px);
  }
}
</style>
