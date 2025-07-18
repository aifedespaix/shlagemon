<script setup lang="ts">
const emit = defineEmits(['win', 'lose'])
const board = ref<(null | 'player' | 'ai')[]>(Array(9).fill(null))
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
  board.value = Array(9).fill(null)
  turn.value = 'player'
  finished.value = false
}

function check(player: 'player' | 'ai') {
  return combos.some(c => c.every(i => board.value[i] === player))
}

function aiMove() {
  const empty = board.value.map((v, i) => (v ? -1 : i)).filter(i => i >= 0)
  if (!empty.length) return end(false)
  const idx = empty[Math.floor(Math.random() * empty.length)]
  board.value[idx] = 'ai'
  if (check('ai')) return end(false)
  if (board.value.every(Boolean)) return end(false)
  turn.value = 'player'
}

function play(i: number) {
  if (finished.value || turn.value !== 'player' || board.value[i]) return
  board.value[i] = 'player'
  if (check('player')) return end(true)
  if (board.value.every(Boolean)) return end(false)
  turn.value = 'ai'
  setTimeout(aiMove, 300)
}

function end(win: boolean) {
  finished.value = true
  if (win) emit('win')
  else emit('lose')
}

onMounted(reset)
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <div class="grid grid-cols-3 gap-1" md="gap-2">
      <button
        v-for="(_, i) in board"
        :key="i"
        class="h-20 w-20 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-3xl"
        md="h-24 w-24"
        @click="play(i)"
      >
        <span v-if="board[i] === 'player'">⭕</span>
        <span v-else-if="board[i] === 'ai'">❌</span>
      </button>
    </div>
    <UiButton class="text-xs" @click="reset">Recommencer</UiButton>
  </div>
</template>
