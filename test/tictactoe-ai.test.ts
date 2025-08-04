import { describe, expect, it } from 'vitest'
import { CENTER_CELLS, findBestMove, SIZE } from '../src/composables/useTicTacToe'

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

const combos = generateCombos()

function check(b: (null | 'player' | 'ai')[], p: 'player' | 'ai') {
  return combos.some(c => c.every(i => b[i] === p))
}

function search(board: (null | 'player' | 'ai')[], playerTurn: boolean): 'ai' | 'player' | 'draw' {
  if (check(board, 'ai'))
    return 'ai'
  if (check(board, 'player'))
    return 'player'
  if (board.every(Boolean))
    return 'draw'
  if (playerTurn) {
    const empty = board
      .map((v, i) => (v ? -1 : i))
      .filter(i => i >= 0 && CENTER_CELLS.includes(i))
    for (const idx of empty) {
      board[idx] = 'player'
      const res = search(board, false)
      board[idx] = null
      if (res === 'player')
        return 'player'
    }
    return 'draw'
  }
  else {
    const possible = CENTER_CELLS.filter(i => !board[i])
    if (!possible.length)
      return search(board, true)
    const idx = findBestMove(board)
    board[idx] = 'ai'
    const res = search(board, true)
    board[idx] = null
    return res
  }
}

describe('tic tac toe ai', () => {
  it('never loses after any first move', () => {
    for (const i of CENTER_CELLS) {
      const board = Array.from({ length: SIZE * SIZE }).fill(null) as (null | 'player' | 'ai')[]
      board[i] = 'player'
      const result = search(board, false)
      expect(result).not.toBe('player')
    }
  })

  it('selects a valid move when options remain', () => {
    const board = Array.from({ length: SIZE * SIZE }).fill(null) as (null | 'player' | 'ai')[]
    board[12] = 'player'
    const idx = findBestMove(board)
    expect(idx).toBeGreaterThanOrEqual(0)
    expect(CENTER_CELLS).toContain(idx)
    expect(board[idx]).toBeNull()
  })
})
