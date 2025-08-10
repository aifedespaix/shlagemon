<script setup lang="ts">
import { BOARD_SIZE } from '~/composables/useBattleship'
import { afidaTourments } from '~/data/characters/afida-tourments'

const emit = defineEmits(['win', 'lose'])
const { t } = useI18n()
const { playerBoard, aiBoard, turn, finished, attack } = useBattleship(w => emit(w ? 'win' : 'lose'))
</script>

<template>
  <div class="w-full flex flex-1 flex-col items-center justify-center gap-2" md="flex-row gap-4">
    <div class="flex flex-1 flex-col">
      <div class="text-center text-blue-900 dark:text-blue-200">
        {{t('components.minigame.Battleship.player')}}
      </div>
      <div class="grid flex-1 gap-1" md="gap-2" :style="{ gridTemplateColumns: `repeat(${BOARD_SIZE},1fr)` }">
        <div
          v-for="(cell, i) in playerBoard"
          :key="`p-${i}`"
          class="aspect-square flex-center rounded text-xl"
          :class="[
            cell.hit
              ? cell.ship
                ? 'bg-red-500'
                : 'bg-gray-400'
              : cell.ship
                ? 'bg-blue-400 dark:bg-blue-700'
                : 'bg-blue-100 dark:bg-blue-800',
            cell.sinking ? 'animate-sink' : '',
          ]"
        >
          <div v-if="cell.hit && cell.ship" class="i-mdi:sail-boat text-white" />
          <div v-else-if="cell.hit" class="i-mdi:close-thick text-white" />
          <div v-else-if="cell.ship" class="i-mdi:sail-boat text-blue-900 dark:text-blue-200" />
        </div>
      </div>
    </div>

    <div class="flex flex-1 flex-col">
      <div class="text-center text-red-900 dark:text-red-200">
        {{ afidaTourments.name }}
      </div>
      <div class="grid flex-1 gap-1" md="gap-2" :style="{ gridTemplateColumns: `repeat(${BOARD_SIZE},1fr)` }">
        <button
          v-for="(cell, i) in aiBoard"
          :key="`a-${i}`"
          class="aspect-square flex-center rounded bg-blue-100 text-xl dark:bg-blue-800"
          :class="[
            cell.hit ? (cell.ship ? 'bg-red-500' : 'bg-gray-400') : '',
            cell.sinking ? 'animate-sink' : '',
          ]"
          :hover="!cell.hit && !finished && turn === 'player' ? 'bg-blue-200 dark:bg-blue-700' : undefined"
          :disabled="cell.hit || finished || turn !== 'player'"
          @click="attack(i)"
        >
          <div v-if="cell.hit && cell.ship" class="i-mdi:sail-boat text-white" />
          <div v-else-if="cell.hit" class="i-mdi:close-thick text-white" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes sink {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.8);
    opacity: 0.7;
  }
}

.animate-sink {
  animation: sink 0.6s ease forwards;
}
</style>
