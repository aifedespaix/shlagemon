<script setup lang="ts">
import { CENTER_CELLS, combos, findBestMove, SIZE } from '~/composables/useTicTacToe'

const emit = defineEmits(['win', 'lose'])
const board = ref<(null | 'player' | 'ai')[]>(Array.from({ length: SIZE * SIZE }).fill(null))
const turn = ref<'player' | 'ai'>('player')
const finished = ref(false)

function isCenter(i: number) {
  return CENTER_CELLS.includes(i)
}

function reset() {
  board.value = Array.from({ length: SIZE * SIZE }).fill(null)
  turn.value = 'player'
  finished.value = false
}

function check(player: 'player' | 'ai') {
  return combos.some(c => c.every(i => board.value[i] === player))
}

function aiMove() {
  const possible = CENTER_CELLS.filter(i => !board.value[i])
  if (!possible.length) {
    if (board.value.every(Boolean))
      return end(false)
    turn.value = 'player'
    return
  }
  const idx = findBestMove(board.value)
  board.value[idx] = 'ai'
  if (check('ai'))
    return end(false)
  if (board.value.every(Boolean))
    return end(false)
  turn.value = 'player'
}

function play(i: number) {
  if (finished.value || turn.value !== 'player' || board.value[i])
    return
  board.value[i] = 'player'
  if (check('player'))
    return end(true)
  if (board.value.every(Boolean))
    return end(false)
  turn.value = 'ai'
  setTimeout(aiMove, 300)
}

function end(win: boolean) {
  finished.value = true
  if (win)
    emit('win')
  else emit('lose')
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
        class="h-12 w-12 flex items-center justify-center rounded text-3xl"
        :class="isCenter(i) ? 'bg-gray-200 dark:bg-gray-700' : 'bg-transparent cursor-default'"
        md="h-20 w-20"
        @click="play(i)"
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
