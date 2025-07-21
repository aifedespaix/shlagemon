import { useAudioStore } from '~/stores/audio'

export const ROWS = 6
export const COLS = 7

type Cell = null | 'player' | 'ai'

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

export function bestColumn(board: Cell[]): number {
  const valid = getValidColumns(board)
  const center = Math.floor(COLS / 2)

  // try to win
  for (const col of valid) {
    const copy = [...board]
    const idx = drop(copy, col, 'ai')
    if (idx !== null && checkWin(copy, 'ai'))
      return col
  }

  // try to block player winning move
  for (const col of valid) {
    const copy = [...board]
    const idx = drop(copy, col, 'player')
    if (idx !== null && checkWin(copy, 'player'))
      return col
  }

  // prefer center column when available
  if (valid.includes(center))
    return center

  // otherwise prefer columns close to center
  return valid.sort((a, b) => Math.abs(a - center) - Math.abs(b - center))[0]
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
