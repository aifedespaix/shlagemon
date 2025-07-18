<script setup lang="ts">
import { CENTER_CELLS, combos, findBestMove, SIZE } from '~/composables/useTicTacToe'

const emit = defineEmits(['win', 'lose'])
const board = ref<(null | 'player' | 'ai')[]>(Array.from({ length: SIZE * SIZE }).fill(null))
const turn = ref<'player' | 'ai'>('player')
const finished = ref(false)
const winningCells = ref<number[]>([])
const drawEffect = ref(false)
const winner = ref<'player' | 'ai' | null>(null)

function centerFull() {
  return CENTER_CELLS.every(i => board.value[i])
}

function reset() {
  board.value = Array.from({ length: SIZE * SIZE }).fill(null)
  turn.value = 'player'
  finished.value = false
  winningCells.value = []
  drawEffect.value = false
  winner.value = null
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
  winner.value = player
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
  <div class="flex flex-1 flex-col items-center gap-2">
    <div class="grid grid-cols-5 grid-rows-5 aspect-square h-full max-h-full max-w-full w-full flex-1 gap-1" md="gap-2">
      <button
        v-for="(_, i) in board"
        :key="i"
        class="aspect-square flex items-center justify-center rounded bg-gray-200 text-xl transition-transform dark:bg-gray-700"
        :class="[
          winningCells.includes(i) ? (winner === 'player' ? 'win-cell-player' : 'win-cell-ai') : '',
          drawEffect ? 'draw-cell' : '',
        ]"
        @click="play(i)"
      >
        <span v-if="board[i] === 'player'" class="text-blue-600">⭕</span>
        <span v-else-if="board[i] === 'ai'" class="text-red-600">❌</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.win-cell-player {
  @apply bg-blue-300 dark:bg-blue-700;
  animation: cell-win 0.3s ease forwards;
}

.win-cell-ai {
  @apply bg-red-300 dark:bg-red-700;
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
