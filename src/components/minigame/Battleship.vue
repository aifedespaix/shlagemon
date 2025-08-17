<script setup lang="ts">
import { BOARD_SIZE } from '~/composables/useBattleship'
import { afidaTourments } from '~/data/characters/afida-tourments'

const emit = defineEmits(['win', 'lose'])
const { t } = useI18n()
const { playerBoard, aiBoard, turn, finished, attack } = useBattleship(w => emit(w ? 'win' : 'lose'))
</script>

<template>
  <!-- parent : s’adapte au parent (pas au viewport) -->
  <div class="min-h-0 w-full flex flex-1 flex-col items-stretch gap-2 sm:(flex-row gap-4)">
    <!-- Panneau joueur -->
    <div class="grid grid-rows-[auto_1fr] min-h-0 min-w-0 w-full flex-1">
      <div class="px-2 text-center text-blue-900 dark:text-blue-200">
        {{ t('components.minigame.Battleship.player') }}
      </div>

      <!-- zone container-sized : limite la grille par largeur ET hauteur du parent -->
      <div class="board-area min-h-0 flex items-center justify-center">
        <div class="board-square">
          <div
            class="grid h-full w-full gap-1 md:gap-2"
            :style="{
              gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
              gridAutoRows: '1fr',
            }"
          >
            <div
              v-for="(cell, i) in playerBoard"
              :key="`p-${i}`"
              class="flex-center rounded text-xl"
              :class="[
                cell.hit
                  ? (cell.ship ? 'bg-red-500' : 'bg-gray-400')
                  : (cell.ship ? 'bg-blue-400 dark:bg-blue-700' : 'bg-blue-100 dark:bg-blue-800'),
                cell.sinking ? 'animate-sink' : '',
              ]"
            >
              <div v-if="cell.hit && cell.ship" class="i-mdi:sail-boat text-white" />
              <div v-else-if="cell.hit" class="i-mdi:close-thick text-white" />
              <div v-else-if="cell.ship" class="i-mdi:sail-boat text-blue-900 dark:text-blue-200" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Panneau IA -->
    <div class="grid grid-rows-[auto_1fr] min-h-0 min-w-0 w-full flex-1">
      <div class="px-2 text-center text-red-900 dark:text-red-200">
        {{ afidaTourments.name }}
      </div>

      <div class="board-area min-h-0 flex items-center justify-center">
        <div class="board-square">
          <div
            class="grid h-full w-full gap-1 md:gap-2"
            :style="{
              gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
              gridAutoRows: '1fr',
            }"
          >
            <button
              v-for="(cell, i) in aiBoard"
              :key="`a-${i}`"
              class="flex-center rounded bg-blue-100 text-xl dark:bg-blue-800"
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
    </div>
  </div>
</template>

<style scoped>
/* === Container queries =============================================== */
/* On déclare la zone comme "container" pour obtenir 100cqi / 100cqb */
.board-area {
  container-type: size;
  inline-size: 100%;
  block-size: 100%;
  overflow: hidden; /* safety contre 1px de rounding */
}

/* Le carré ne dépasse ni la largeur NI la hauteur dispo du container */
.board-square {
  inline-size: min(100cqi, 100cqb);
  aspect-ratio: 1 / 1;
  block-size: auto; /* suit l'aspect-ratio */
  max-inline-size: 100%; /* jamais plus large que la colonne */
}

/* Anim */
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
