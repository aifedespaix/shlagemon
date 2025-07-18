import { describe, expect, it } from 'vitest'
import { BOARD_SIZE, createBattleshipAI } from '../src/composables/useBattleship'

function neighbors(idx: number): number[] {
  const res: number[] = []
  const r = Math.floor(idx / BOARD_SIZE)
  const c = idx % BOARD_SIZE
  if (r > 0)
    res.push((r - 1) * BOARD_SIZE + c)
  if (r < BOARD_SIZE - 1)
    res.push((r + 1) * BOARD_SIZE + c)
  if (c > 0)
    res.push(r * BOARD_SIZE + c - 1)
  if (c < BOARD_SIZE - 1)
    res.push(r * BOARD_SIZE + c + 1)
  return res
}

describe('battleship ai', () => {
  it('targets adjacent cell after a hit', () => {
    const ai = createBattleshipAI()
    const hitIndex = 12
    ai.record(hitIndex, true)
    const next = ai.nextMove()
    expect(neighbors(hitIndex)).toContain(next)
  })
})
