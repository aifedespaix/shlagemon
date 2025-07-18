<script setup lang="ts">
const emit = defineEmits(['win', 'lose'])
const board = ref<(null | 'player' | 'ai')[]>(Array.from({ length: 9 }).fill(null))
const turn = ref<'player' | 'ai'>('player')
const finished = ref(false)

const combos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function reset() {
  board.value = Array.from({ length: 9 }).fill(null)
  turn.value = 'player'
  finished.value = false
}

function check(player: 'player' | 'ai') {
  return combos.some(c => c.every(i => board.value[i] === player))
}

function findBestMove(state: (null | 'player' | 'ai')[] = board.value) {
  function checkLocal(b: (null | 'player' | 'ai')[], p: 'player' | 'ai') {
    return combos.some(c => c.every(i => b[i] === p))
  }

  function minimax(
    b: (null | 'player' | 'ai')[],
    current: 'player' | 'ai',
  ): number {
    if (checkLocal(b, 'ai'))
      return 1
    if (checkLocal(b, 'player'))
      return -1
    if (b.every(Boolean))
      return 0
    const empty = b.map((v, i) => (v ? -1 : i)).filter(i => i >= 0)
    if (current === 'ai') {
      let best = -Infinity
      for (const idx of empty) {
        b[idx] = 'ai'
        const score = minimax(b, 'player')
        b[idx] = null
        best = Math.max(best, score)
      }
      return best
    }
    else {
      let best = Infinity
      for (const idx of empty) {
        b[idx] = 'player'
        const score = minimax(b, 'ai')
        b[idx] = null
        best = Math.min(best, score)
      }
      return best
    }
  }

  let bestScore = -Infinity
  let bestIdx = -1
  const empty = state.map((v, i) => (v ? -1 : i)).filter(i => i >= 0)
  for (const idx of empty) {
    const copy = [...state]
    copy[idx] = 'ai'
    const score = minimax(copy, 'player')
    if (score > bestScore) {
      bestScore = score
      bestIdx = idx
    }
  }
  return bestIdx
}

function aiMove() {
  const empty = board.value.some(v => !v)
  if (!empty)
    return end(false)
  const idx = findBestMove()
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
    <div class="grid grid-cols-3 gap-1" md="gap-2">
      <button
        v-for="(_, i) in board"
        :key="i"
        class="h-20 w-20 flex items-center justify-center rounded bg-gray-200 text-3xl dark:bg-gray-700"
        md="h-24 w-24"
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
