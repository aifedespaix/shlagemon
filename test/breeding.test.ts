import { describe, expect, it } from 'vitest'
import { breedingCost, COST_BASE_A, COST_GROWTH_C } from '~/utils/breeding'

describe('breedingCost', () => {
  it('returns base cost for rarity 1', () => {
    expect(breedingCost(1)).toBe(Math.round(COST_BASE_A))
  })

  it('clamps rarity below 1', () => {
    expect(breedingCost(-5)).toBe(breedingCost(1))
  })

  it('clamps rarity above 100', () => {
    expect(breedingCost(999)).toBe(breedingCost(100))
  })

  it('applies exponential growth', () => {
    const rarity = 10
    const expected = Math.round(COST_BASE_A * COST_GROWTH_C ** (rarity - 1))
    expect(breedingCost(rarity)).toBe(expected)
  })
})
