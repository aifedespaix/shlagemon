import { describe, expect, it } from 'vitest'
import { pickRandomByCoefficient } from '../src/utils/spawn'

const m1 = { id: 'm1', name: 'm1', description: '', types: [], coefficient: 1 }
const m50 = { id: 'm50', name: 'm50', description: '', types: [], coefficient: 50 }
const m100 = { id: 'm100', name: 'm100', description: '', types: [], coefficient: 100 }

const list = [m1, m50, m100]

describe('spawn weighting', () => {
  it('prefers lower coefficient', () => {
    const counts = { m1: 0, m50: 0, m100: 0 }
    for (let i = 0; i < 10000; i++)
      counts[pickRandomByCoefficient(list).id]++
    expect(counts.m1).toBeGreaterThan(counts.m50)
    expect(counts.m50).toBeGreaterThan(counts.m100)
  })
})
