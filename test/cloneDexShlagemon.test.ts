import { describe, expect, it } from 'vitest'
import { cloneDexShlagemon } from '../src/utils/clone'

const base = { id: 'base', name: 'Base', description: '', types: [] }
const mon = { id: 'id', base, baseStats: { hp: 1, attack: 1, defense: 1, smelling: 1 }, captureDate: '', captureCount: 1, lvl: 1, xp: 0, rarity: 1, sex: 'male', isShiny: false, hpCurrent: 1, allowEvolution: true, busy: false, heldItemId: null }

describe('cloneDexShlagemon', () => {
  it('creates a copy', () => {
    const clone = cloneDexShlagemon(mon)
    expect(clone).not.toBe(mon)
    expect(clone.base).toBe(mon.base)
    expect(clone).toMatchObject(mon)
  })
})
