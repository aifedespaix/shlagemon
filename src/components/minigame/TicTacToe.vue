<script setup lang="ts">
import { CENTER_CELLS, combos, findBestMove, SIZE } from '~/composables/useTicTacToe'

const emit = defineEmits(['win', 'lose'])
const board = ref<(null | 'player' | 'ai')[]>(Array.from({ length: SIZE * SIZE }).fill(null))
const turn = ref<'player' | 'ai'>('player')
const finished = ref(false)
const winningCells = ref<number[]>([])
const drawEffect = ref(false)

function centerFull() {
  return CENTER_CELLS.every(i => board.value[i])
}

function isCenter(i: number) {
  return CENTER_CELLS.includes(i)
}

function reset() {
  board.value = Array.from({ length: SIZE * SIZE }).fill(null)
  turn.value = 'player'
  finished.value = false
  winningCells.value = []
  drawEffect.value = false
}

function check(player: 'player' | 'ai') {
  return combos.some(c => c.every(i => board.value[i] === player))
}

function aiMove() {
  const possible = CENTER_CELLS.filter(i => !board.value[i])
  if (!possible.length)
    return end(false, true)
  const idx = findBestMove(board.value)
  board.value[idx] = 'ai'
  if (check('ai'))
    return end(false)
  if (centerFull())
    return end(false, true)
  turn.value = 'player'
}

function play(i: number) {
  if (
    finished.value
    || turn.value !== 'player'
    || board.value[i]
    || !isCenter(i)
  ) {
    return
  }
  board.value[i] = 'player'
  if (check('player'))
    return end(true)
  if (centerFull())
    return end(false, true)
  turn.value = 'ai'
  setTimeout(aiMove, 300)
}

function end(win: boolean, draw = false) {
  finished.value = true
  if (draw) {
    drawEffect.value = true
    setTimeout(() => emit('lose'), 600)
    return
  }
  const player = win ? 'player' : 'ai'
  const combo = combos.find(c => c.every(i => board.value[i] === player))
  if (combo) {
    winningCells.value = []
    combo.forEach((cell, idx) => {
      setTimeout(() => {
        winningCells.value.push(cell)
      }, idx * 300)
    })
    setTimeout(() => emit(win ? 'win' : 'lose'), combo.length * 300 + 400)
  }
  else {
    emit(win ? 'win' : 'lose')
  }
}

defineExpose({ findBestMove })

onMounted(reset)
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <div class="grid grid-cols-5 gap-1" md="gap-2">
      <button
        v-for="(_, i) in board"
        :key="i"
        class="h-12 w-12 flex items-center justify-center rounded text-3xl transition-transform"
        :class="[
          isCenter(i) ? 'bg-gray-200 dark:bg-gray-700' : 'bg-transparent cursor-default pointer-events-none',
          winningCells.includes(i) ? 'win-cell' : '',
          drawEffect && isCenter(i) ? 'draw-cell' : '',
        ]"
        md="h-20 w-20"
        @click="isCenter(i) && play(i)"
      >
        <span v-if="board[i] === 'player'">⭕</span>
        <span v-else-if="board[i] === 'ai'">❌</span>
      </button>
    </div>
    <UiButton class="text-xs" @click="reset">
      Recommencer
    </UiButton>
  </div>
</template>

<style scoped>
.win-cell {
  @apply bg-green-300 dark:bg-green-700;
  animation: cell-win 0.3s ease forwards;
}

.draw-cell {
  animation: cell-draw 0.3s ease;
}

@keyframes cell-win {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.2);
  }
}

@keyframes cell-draw {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
</style>
