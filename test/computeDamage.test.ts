import { describe, expect, it, vi } from 'vitest'
import { computeDamage } from '../src/utils/combat'

describe('computeDamage dual type', () => {
  it('applies multipliers from both target types', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    const result = computeDamage(100, 'poison', ['fee', 'normal'])
    expect(result.damage).toBe(150)
    expect(result.effect).toBe('super')
    expect(result.crit).toBe('normal')
  })

  it('handles resistance and weakness', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    const result = computeDamage(100, 'combat', ['normal', 'vol'])
    expect(result.damage).toBe(75)
    expect(result.effect).toBe('not')
    expect(result.crit).toBe('normal')
  })
})
