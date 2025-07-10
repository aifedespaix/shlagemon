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

import CaptureOverlay from './CaptureOverlay.vue'

const props = defineProps<{ enemy: DexShlagemon | null, enemyHp: number, stopBattle: () => void }>()
const emit = defineEmits<{ (e: 'finish', success: boolean): void }>()

const inventory = useInventoryStore()
const ballStore = useBallStore()
const player = usePlayerStore()
const captureLimitModal = useCaptureLimitModalStore()
const audio = useAudioStore()

const showCapture = ref(false)
const captureBall = ref(balls[0])

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
  audio.playSfx('/audio/sfx/capture-start.ogg')
}

function onCaptureEnd(success: boolean) {
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
    <CaptureOverlay
      v-if="showCapture && enemy"
      :target="enemy"
      :ball="captureBall"
      @finish="onCaptureEnd"
    />
  </div>
</template>
