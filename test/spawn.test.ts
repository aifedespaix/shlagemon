import { describe, expect, it } from 'vitest'
import { pickByAlphabet } from '../src/utils/spawn'

const list = [
  { id: 'a', name: 'a', description: '', types: [] },
  { id: 'b', name: 'b', description: '', types: [] },
  { id: 'c', name: 'c', description: '', types: [] },
  { id: 'd', name: 'd', description: '', types: [] },
]

describe('alphabetical spawn', () => {
  it('uses the counter to pick deterministically', () => {
    expect(pickByAlphabet(list, 0).id).toBe('a')
    expect(pickByAlphabet(list, 1).id).toBe('b')
    expect(pickByAlphabet(list, 2).id).toBe('b')
    expect(pickByAlphabet(list, 3).id).toBe('c')
    expect(pickByAlphabet(list, 4).id).toBe('c')
    expect(pickByAlphabet(list, 5).id).toBe('c')
    expect(pickByAlphabet(list, 6).id).toBe('d')
  })
})
