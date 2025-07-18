import { ref } from 'vue'

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

type Cell = null | 'player' | 'ai'

export function check(board: Cell[], player: 'player' | 'ai') {
  return combos.some(c => c.every(i => board[i] === player))
}

export function findBestMove(state: Cell[]): number {
  function minimax(b: Cell[], current: 'player' | 'ai'): number {
    if (check(b, 'ai'))
      return 1
    if (check(b, 'player'))
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

export function useTicTacToe() {
  const board = ref<Cell[]>(Array.from({ length: 9 }).fill(null))
  const turn = ref<'player' | 'ai'>('player')
  const finished = ref(false)

  function reset() {
    board.value = Array.from({ length: 9 }).fill(null)
    turn.value = 'player'
    finished.value = false
  }

  function end(win: boolean) {
    finished.value = true
    return win
  }

  function aiMove() {
    if (!board.value.some(v => !v))
      return end(false)
    const idx = findBestMove(board.value)
    board.value[idx] = 'ai'
    if (check(board.value, 'ai'))
      return end(false)
    if (board.value.every(Boolean))
      return end(false)
    turn.value = 'player'
  }

  function play(i: number) {
    if (finished.value || turn.value !== 'player' || board.value[i])
      return
    board.value[i] = 'player'
    if (check(board.value, 'player'))
      return end(true)
    if (board.value.every(Boolean))
      return end(false)
    turn.value = 'ai'
    aiMove()
  }

  reset()

  return { board, turn, finished, reset, play, aiMove }
}
