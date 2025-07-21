import { useAudioStore } from '~/stores/audio'

export interface Cell {
  ship: boolean
  hit: boolean
  shipId?: number
}

export const BOARD_SIZE = 5
const SHIPS = [3, 2, 2]

function createBoard(): Cell[] {
  return Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map(() => ({
    ship: false,
    hit: false,
    shipId: undefined,
  }))
}

function index(row: number, col: number) {
  return row * BOARD_SIZE + col
}

function placeShip(board: Cell[], length: number, id: number) {
  while (true) {
    const vertical = Math.random() > 0.5
    const maxRow = vertical ? BOARD_SIZE - length : BOARD_SIZE - 1
    const maxCol = vertical ? BOARD_SIZE - 1 : BOARD_SIZE - length
    const r = Math.floor(Math.random() * (maxRow + 1))
    const c = Math.floor(Math.random() * (maxCol + 1))
    let valid = true
    for (let i = 0; i < length; i++) {
      const idx = vertical ? index(r + i, c) : index(r, c + i)
      if (board[idx].ship) {
        valid = false
        break
      }
    }
    if (!valid)
      continue
    for (let i = 0; i < length; i++) {
      const idx = vertical ? index(r + i, c) : index(r, c + i)
      board[idx].ship = true
      board[idx].shipId = id
    }
    break
  }
}

function placeShips(board: Cell[]) {
  SHIPS.forEach((s, i) => placeShip(board, s, i))
}

function neighbors(idx: number): number[] {
  const res: number[] = []
  const r = Math.floor(idx / BOARD_SIZE)
  const c = idx % BOARD_SIZE
  if (r > 0)
    res.push(index(r - 1, c))
  if (r < BOARD_SIZE - 1)
    res.push(index(r + 1, c))
  if (c > 0)
    res.push(index(r, c - 1))
  if (c < BOARD_SIZE - 1)
    res.push(index(r, c + 1))
  return res
}

function shipSunk(board: Cell[], id: number | undefined) {
  if (id === undefined)
    return false
  return board.every(c => c.shipId !== id || c.hit)
}

export function createBattleshipAI() {
  const queue: number[] = []
  const attacked = new Set<number>()
  return {
    nextMove(): number {
      if (queue.length)
        return queue.shift()!
      let idx
      do {
        idx = Math.floor(Math.random() * BOARD_SIZE * BOARD_SIZE)
      } while (attacked.has(idx))
      return idx
    },
    record(idx: number, hit: boolean) {
      attacked.add(idx)
      if (hit)
        queue.push(...neighbors(idx).filter(i => !attacked.has(i) && !queue.includes(i)))
    },
  }
}

export function useBattleship(onEnd: (win: boolean) => void) {
  const playerBoard = ref<Cell[]>(createBoard())
  const aiBoard = ref<Cell[]>(createBoard())
  const turn = ref<'player' | 'ai'>('player')
  const finished = ref(false)
  let playerShips = 0
  let aiShips = 0
  const audio = useAudioStore()
  const ai = createBattleshipAI()

  function reset() {
    playerBoard.value = createBoard()
    aiBoard.value = createBoard()
    placeShips(playerBoard.value)
    placeShips(aiBoard.value)
    playerShips = playerBoard.value.filter(c => c.ship).length
    aiShips = aiBoard.value.filter(c => c.ship).length
    turn.value = 'player'
    finished.value = false
  }

  function attack(i: number) {
    if (finished.value || turn.value !== 'player' || aiBoard.value[i].hit)
      return
    const cell = aiBoard.value[i]
    cell.hit = true
    if (cell.ship) {
      aiShips--
      if (shipSunk(aiBoard.value, cell.shipId))
        audio.playSfx('/audio/sfx/mini-game/battleship/touche-coule.ogg')
      else
        audio.playSfx('/audio/sfx/mini-game/battleship/touche.ogg')
    }
    else {
      audio.playSfx('/audio/sfx/mini-game/battleship/rate.ogg')
    }
    if (aiShips <= 0)
      return end(true)
    turn.value = 'ai'
    useTimeoutFn(aiMove, 300)
  }

  function aiMove() {
    if (finished.value)
      return
    let idx = ai.nextMove()
    while (playerBoard.value[idx].hit)
      idx = ai.nextMove()
    const cell = playerBoard.value[idx]
    cell.hit = true
    ai.record(idx, cell.ship)
    if (cell.ship) {
      playerShips--
      if (shipSunk(playerBoard.value, cell.shipId))
        audio.playSfx('/audio/sfx/mini-game/battleship/touche-coule.ogg')
      else
        audio.playSfx('/audio/sfx/mini-game/battleship/touche.ogg')
    }
    else {
      audio.playSfx('/audio/sfx/mini-game/battleship/rate.ogg')
    }
    if (playerShips <= 0)
      return end(false)
    turn.value = 'player'
  }

  function end(win: boolean) {
    finished.value = true
    onEnd(win)
  }

  reset()

  return { playerBoard, aiBoard, turn, finished, attack, reset }
}
