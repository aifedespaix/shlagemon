import { describe, expect, it } from 'vitest'
import { bestColumn, COLS, createConnectFourBoard, drop, randomColumn, ROWS } from '../src/composables/useConnectFour'

describe('connect four ai', () => {
  it('never selects a full column', () => {
    const board = createConnectFourBoard()
    for (let r = 0; r < ROWS; r++)
      board[r * COLS] = 'player'
    const choices = new Set<number>()
    for (let i = 0; i < 20; i++)
      choices.add(randomColumn(board))
    expect(choices.has(0)).toBe(false)
  })

  it('wins when possible', () => {
    const board = createConnectFourBoard()
    drop(board, 0, 'ai')
    drop(board, 1, 'ai')
    drop(board, 2, 'ai')
    expect(bestColumn(board)).toBe(3)
  })

  it('blocks player winning move', () => {
    const board = createConnectFourBoard()
    drop(board, 0, 'player')
    drop(board, 1, 'player')
    drop(board, 2, 'player')
    expect(bestColumn(board)).toBe(3)
  })
})
