import { useAudioStore } from '~/stores/audio'

export const ROWS = 6
export const COLS = 7

type Cell = null | 'player' | 'ai'

function generateCombos() {
  const combos: number[][] = []
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++)
      combos.push([r * COLS + c, r * COLS + c + 1, r * COLS + c + 2, r * COLS + c + 3])
  }
  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r <= ROWS - 4; r++)
      combos.push([r * COLS + c, (r + 1) * COLS + c, (r + 2) * COLS + c, (r + 3) * COLS + c])
  }
  for (let r = 0; r <= ROWS - 4; r++) {
    for (let c = 0; c <= COLS - 4; c++)
      combos.push([r * COLS + c, (r + 1) * COLS + c + 1, (r + 2) * COLS + c + 2, (r + 3) * COLS + c + 3])
  }
  for (let r = 3; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++)
      combos.push([r * COLS + c, (r - 1) * COLS + c + 1, (r - 2) * COLS + c + 2, (r - 3) * COLS + c + 3])
  }
  return combos
}

const COMBOS = generateCombos()

export function createConnectFourBoard(): Cell[] {
  return Array.from({ length: ROWS * COLS }).fill(null)
}

export function getValidColumns(board: Cell[]): number[] {
  const cols: number[] = []
  for (let c = 0; c < COLS; c++) {
    if (!board[c])
      cols.push(c)
  }
  return cols
}

export function randomColumn(board: Cell[]): number {
  const valid = getValidColumns(board)
  return valid[Math.floor(Math.random() * valid.length)]
}

function evaluateBoard(board: Cell[]): number {
  let score = 0
  const center = Math.floor(COLS / 2)
  for (let r = 0; r < ROWS; r++) {
    const idx = r * COLS + center
    if (board[idx] === 'ai')
      score += 3
    else if (board[idx] === 'player')
      score -= 3
  }
  for (const combo of COMBOS) {
    let ai = 0
    let player = 0
    for (const idx of combo) {
      if (board[idx] === 'ai')
        ai++
      else if (board[idx] === 'player')
        player++
    }
    if (ai && player)
      continue
    if (ai === 4)
      score += 1000
    else if (ai === 3)
      score += 5
    else if (ai === 2)
      score += 2
    else if (player === 4)
      score -= 1000
    else if (player === 3)
      score -= 5
    else if (player === 2)
      score -= 2
  }
  return score
}

function minimax(board: Cell[], depth: number, maximizing: boolean, alpha: number, beta: number): number {
  if (checkWin(board, 'ai'))
    return Infinity
  if (checkWin(board, 'player'))
    return -Infinity
  const valid = getValidColumns(board)
  if (depth === 0 || valid.length === 0)
    return evaluateBoard(board)

  if (maximizing) {
    let value = -Infinity
    for (const col of valid) {
      const copy = [...board]
      drop(copy, col, 'ai')
      value = Math.max(value, minimax(copy, depth - 1, false, alpha, beta))
      alpha = Math.max(alpha, value)
      if (alpha >= beta)
        break
    }
    return value
  }
  else {
    let value = Infinity
    for (const col of valid) {
      const copy = [...board]
      drop(copy, col, 'player')
      value = Math.min(value, minimax(copy, depth - 1, true, alpha, beta))
      beta = Math.min(beta, value)
      if (alpha >= beta)
        break
    }
    return value
  }
}

export function bestColumn(board: Cell[], depth = 3): number {
  const valid = getValidColumns(board)
  let bestScore = -Infinity
  let best: number[] = []
  for (const col of valid) {
    const copy = [...board]
    drop(copy, col, 'ai')
    const score = minimax(copy, depth - 1, false, -Infinity, Infinity)
    if (score > bestScore) {
      bestScore = score
      best = [col]
    }
    else if (score === bestScore) {
      best.push(col)
    }
  }
  return best[Math.floor(Math.random() * best.length)]
}

function drop(board: Cell[], col: number, player: 'player' | 'ai'): number | null {
  for (let r = ROWS - 1; r >= 0; r--) {
    const idx = r * COLS + col
    if (!board[idx]) {
      board[idx] = player
      return idx
    }
  }
  return null
}

function checkWin(board: Cell[], player: 'player' | 'ai'): number[] | null {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const idx = r * COLS + c
      if (board[idx] !== player)
        continue
      // horizontal
      if (c <= COLS - 4
        && board[idx + 1] === player
        && board[idx + 2] === player
        && board[idx + 3] === player) {
        return [idx, idx + 1, idx + 2, idx + 3]
      }
      // vertical
      if (r <= ROWS - 4
        && board[idx + COLS] === player
        && board[idx + COLS * 2] === player
        && board[idx + COLS * 3] === player) {
        return [idx, idx + COLS, idx + COLS * 2, idx + COLS * 3]
      }
      // diag down-right
      if (r <= ROWS - 4 && c <= COLS - 4
        && board[idx + COLS + 1] === player
        && board[idx + COLS * 2 + 2] === player
        && board[idx + COLS * 3 + 3] === player) {
        return [idx, idx + COLS + 1, idx + COLS * 2 + 2, idx + COLS * 3 + 3]
      }
      // diag up-right
      if (r >= 3 && c <= COLS - 4
        && board[idx - COLS + 1] === player
        && board[idx - COLS * 2 + 2] === player
        && board[idx - COLS * 3 + 3] === player) {
        return [idx, idx - COLS + 1, idx - COLS * 2 + 2, idx - COLS * 3 + 3]
      }
    }
  }
  return null
}

export function useConnectFour() {
  const board = ref<Cell[]>(createConnectFourBoard())
  const turn = ref<'player' | 'ai'>('player')
  const finished = ref(false)
  const winningCells = ref<number[]>([])
  const lastMove = ref<number | null>(null)
  const audio = useAudioStore()

  function reset() {
    board.value = createConnectFourBoard()
    turn.value = 'player'
    finished.value = false
    winningCells.value = []
    lastMove.value = null
  }

  function end(win: boolean, combo: number[] | null) {
    finished.value = true
    if (combo)
      winningCells.value = combo
    return win
  }

  function aiMove() {
    if (finished.value)
      return
    const col = bestColumn(board.value)
    const idx = drop(board.value, col, 'ai')
    lastMove.value = idx
    audio.playSfx('/audio/sfx/mini-game/connectfour/ai.ogg')
    const combo = checkWin(board.value, 'ai')
    if (combo)
      return end(false, combo)
    if (board.value.every(Boolean))
      return end(false, null)
    turn.value = 'player'
  }

  function play(col: number) {
    if (finished.value || turn.value !== 'player')
      return
    const idx = drop(board.value, col, 'player')
    if (idx === null)
      return
    lastMove.value = idx
    audio.playSfx('/audio/sfx/mini-game/connectfour/player.ogg')
    const combo = checkWin(board.value, 'player')
    if (combo)
      return end(true, combo)
    if (board.value.every(Boolean))
      return end(false, null)
    turn.value = 'ai'
    const delay = 800 + Math.random() * 400
    setTimeout(aiMove, delay)
  }

  function checkAndSetWinner(player: 'player' | 'ai') {
    const combo = checkWin(board.value, player)
    if (combo) {
      winningCells.value = combo
      return true
    }
    return false
  }

  return { board, turn, finished, winningCells, lastMove, reset, play, aiMove, checkAndSetWinner }
}

export { checkWin, drop }
