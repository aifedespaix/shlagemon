import { describe, expect, it } from 'vitest'
import { COLS, createConnectFourBoard, randomColumn, ROWS } from '../src/composables/useConnectFour'

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
})
