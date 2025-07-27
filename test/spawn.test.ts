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
})
