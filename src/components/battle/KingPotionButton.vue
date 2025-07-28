<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useKingPotionStore } from '~/stores/kingPotion'

const potion = useKingPotionStore()
const { power } = storeToRefs(potion)

const anim = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

function endHold() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

function startHold() {
  if (!power.value)
    return
  timer = setTimeout(() => {
    anim.value = true
    potion.activate()
    setTimeout(() => (anim.value = false), 600)
  }, 1000)
}
</script>

<template>
  <UiButton
    v-if="power"
    class="absolute right-50% top-12 aspect-square h-12 w-12 flex flex-col translate-x-1/2 items-center justify-center rounded-full text-xs"
    md="top-16 h-16 w-16"
    type="icon"
    @pointerdown="startHold"
    @pointerup="endHold"
    @pointerleave="endHold"
    @pointercancel="endHold"
  >
    <div
      class="relative flex items-center justify-center rounded-full p-1"
      :class="`rainbow-${power}`"
    >
      <div class="potion-aura absolute inset-0 rounded-full" :class="{ 'scale-110': anim }" />
      <div class="i-game-icons:potion-ball relative z-1 h-8 w-8" />
    </div>
  </UiButton>
</template>

<style scoped>
.potion-aura {
  background: conic-gradient(red, orange, yellow, lime, cyan, blue, purple, red);
  opacity: 0.6;
  transition: transform 0.3s ease;
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
