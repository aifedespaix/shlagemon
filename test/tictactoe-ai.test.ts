import { describe, expect, it } from 'vitest'
import { findBestMove } from '../src/composables/useTicTacToe'

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
    const empty = board.map((v, i) => (v ? -1 : i)).filter(i => i >= 0)
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
    const idx = findBestMove(board)
    board[idx] = 'ai'
    const res = search(board, true)
    board[idx] = null
    return res
  }
}

describe('tic tac toe ai', () => {
  it('never loses after any first move', () => {
    for (let i = 0; i < 9; i++) {
      const board = Array.from({ length: 9 }).fill(null) as (null | 'player' | 'ai')[]
      board[i] = 'player'
      const result = search(board, false)
      expect(result).not.toBe('player')
    }
  })
})
