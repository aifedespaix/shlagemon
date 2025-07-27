import { describe, expect, it } from 'vitest'
import { pickRandom } from '../src/utils/spawn'

const list = [
  { id: 'm1', name: 'm1', description: '', types: [] },
  { id: 'm2', name: 'm2', description: '', types: [] },
  { id: 'm3', name: 'm3', description: '', types: [] },
]

describe('spawn selection', () => {
  it('returns a monster from the list', () => {
    const result = pickRandom(list)
    expect(list).toContain(result)
  })

  it('picks each monster with roughly equal probability', () => {
    const counts = {
      m1: 0,
      m2: 0,
      m3: 0,
    }
    const runs = 3000
    for (let i = 0; i < runs; i++) {
      const pick = pickRandomByCoefficient(list)
      counts[pick.id as keyof typeof counts]++
    }
    const expected = runs / list.length
    for (const c of Object.values(counts))
      expect(c).toBeGreaterThan(expected * 0.8)
  })
})
