import { describe, expect, it } from 'vitest'
import { specialityBonus } from '../src/constants/speciality'

describe('speciality bonus', () => {
  it('applies reduced evolution bonuses', () => {
    expect(specialityBonus.evolution0).toBe(0)
    expect(specialityBonus.evolution1).toBe(5)
    expect(specialityBonus.evolution2).toBe(10)
  })

  it('sets standalone bonuses', () => {
    expect(specialityBonus.unique).toBe(7)
    expect(specialityBonus.legendary).toBe(20)
  })
})
