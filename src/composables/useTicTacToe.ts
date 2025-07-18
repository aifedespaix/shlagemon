import { ref } from 'vue'

export const SIZE = 5
export const CENTER_CELLS = [6, 7, 8, 11, 12, 13, 16, 17, 18]

function generateCombos() {
  const res: number[][] = []
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c <= SIZE - 3; c++)
      res.push([r * SIZE + c, r * SIZE + c + 1, r * SIZE + c + 2])
  }

  for (let c = 0; c < SIZE; c++) {
    for (let r = 0; r <= SIZE - 3; r++)
      res.push([r * SIZE + c, (r + 1) * SIZE + c, (r + 2) * SIZE + c])
  }

  for (let r = 0; r <= SIZE - 3; r++) {
    for (let c = 0; c <= SIZE - 3; c++)
      res.push([r * SIZE + c, (r + 1) * SIZE + c + 1, (r + 2) * SIZE + c + 2])
    for (let c = 2; c < SIZE; c++)
      res.push([r * SIZE + c, (r + 1) * SIZE + c - 1, (r + 2) * SIZE + c - 2])
  }
  return res
}

export const combos = generateCombos()

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
    const empty = b
      .map((v, i) => (v ? -1 : i))
      .filter(i => i >= 0 && (current !== 'ai' || CENTER_CELLS.includes(i)))
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
  const empty = state
    .map((v, i) => (v ? -1 : i))
    .filter(i => i >= 0 && CENTER_CELLS.includes(i))
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
  const board = ref<Cell[]>(Array.from({ length: SIZE * SIZE }).fill(null))
  const turn = ref<'player' | 'ai'>('player')
  const finished = ref(false)

  function reset() {
    board.value = Array.from({ length: SIZE * SIZE }).fill(null)
    turn.value = 'player'
    finished.value = false
  }

  function end(win: boolean) {
    finished.value = true
    return win
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
