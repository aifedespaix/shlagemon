<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useAudioStore } from '~/stores/audio'
import { useKingPotionStore } from '~/stores/kingPotion'

const potion = useKingPotionStore()
const { power } = storeToRefs(potion)
const audio = useAudioStore()

const holding = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null
let soundId: number | undefined

function cancelHold() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  if (soundId !== undefined) {
    audio.stopSfx('items-KingPotion', soundId)
    soundId = undefined
  }
  holding.value = false
}

function startHold() {
  if (!power.value || potion.used)
    return
  holding.value = true
  soundId = audio.playSfx('items-KingPotion', { loop: true })
  timer = setTimeout(() => {
    potion.activate()
    holding.value = false
    if (soundId !== undefined) {
      audio.stopSfx('items-KingPotion', soundId)
      soundId = undefined
    }
  }, 1000)
}
</script>

<template>
  <UiButton
    v-if="power && !potion.used"
    class="absolute right-50% top-12 aspect-square h-12 w-12 flex flex-col translate-x-1/2 items-center justify-center rounded-full text-xs"
    md="top-16 h-16 w-16"
    type="icon"
    @pointerdown="startHold"
    @pointerup="cancelHold"
    @pointerleave="cancelHold"
    @pointercancel="cancelHold"
  >
    <div
      class="relative flex items-center justify-center rounded-full p-1"
      :class="`rainbow-${power}`"
    >
      <div class="potion-aura absolute inset-0 rounded-full" :class="{ holding }" />
      <div class="mask-rainbow i-game-icons:potion-ball relative z-1 h-8 w-8" />
    </div>
  </UiButton>
</template>

<style scoped>
.potion-aura {
  background: conic-gradient(red, orange, yellow, lime, cyan, blue, purple, red);
  opacity: 0.6;
  transform: scale(0);
  transition: transform 0.2s ease;
}
.potion-aura.holding {
  transform: scale(2);
  transition: transform 1s linear;
}
.rainbow-15 .potion-aura {
  filter: brightness(0.8);
}
.rainbow-30 .potion-aura {
  filter: brightness(1);
}
.rainbow-50 .potion-aura {
  filter: brightness(1.2);
}
</style>
