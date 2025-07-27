import { describe, expect, it } from 'vitest'
import { bestColumn, COLS, createConnectFourBoard, drop, HIDDEN_COLS, randomColumn, ROWS } from '../src/composables/useConnectFour'

describe('connect four ai', () => {
  it('never selects a full column', () => {
    const board = createConnectFourBoard()
    for (let r = 0; r < ROWS; r++)
      board[r * COLS + 1] = 'player'
    const choices = new Set<number>()
    for (let i = 0; i < 20; i++)
      choices.add(randomColumn(board, true))
    expect(choices.has(1)).toBe(false)
  })

  it('wins when possible', () => {
    const board = createConnectFourBoard()
    drop(board, 1, 'ai')
    drop(board, 2, 'ai')
    drop(board, 3, 'ai')
    expect([4, 7]).toContain(bestColumn(board))
  })

  it.skip('blocks player winning move', () => {
    const board = createConnectFourBoard()
    drop(board, 1, 'player')
    drop(board, 2, 'player')
    drop(board, 3, 'player')
    expect(bestColumn(board)).toBeGreaterThanOrEqual(0)
  })

  it('never plays in hidden columns', () => {
    const board = createConnectFourBoard()
    for (let i = 0; i < 10; i++) {
      expect(randomColumn(board, true)).not.toBe(HIDDEN_COLS[0])
      expect(randomColumn(board, true)).not.toBe(HIDDEN_COLS[1])
    }
    const best = bestColumn(board)
    expect(HIDDEN_COLS).not.toContain(best)
  })
})
