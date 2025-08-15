import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useBreedingStore } from '../src/stores/breeding'
import { useEggBoxStore } from '../src/stores/eggBox'
import { useGameStore } from '../src/stores/game'
import { BREEDING_DURATION_MS } from '../src/utils/breeding'

vi.mock('../src/stores/egg', () => ({
  useEggStore: () => ({ incubator: [], startIncubation: vi.fn() }),
}))

describe('breeding store', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('blocks new breeding until egg collected and stores egg in box', () => {
    const breeding = useBreedingStore()
    const game = useGameStore()
    const box = useEggBoxStore()
    game.shlagidolar = 1_000_000

    expect(breeding.start('feu', 10, 'salamiches')).toBe(true)
    expect(breeding.start('feu', 10, 'salamiches')).toBe(false)

    vi.advanceTimersByTime(BREEDING_DURATION_MS + 1)
    expect(breeding.completeIfDue('feu')).toBe(true)
    expect(breeding.start('feu', 10, 'salamiches')).toBe(false)
    expect(box.breeding.length).toBe(0)

    expect(breeding.collectEgg('feu')).toBe(true)
    expect(box.breeding.length).toBe(1)
    expect(box.breeding[0].monId).toBe('salamiches')

    expect(breeding.start('feu', 10, 'salamiches')).toBe(true)
  })

  it('breeds evolved shlagemon and returns base ancestor egg', () => {
    const breeding = useBreedingStore()
    const game = useGameStore()
    const box = useEggBoxStore()
    game.shlagidolar = 1_000_000

    expect(breeding.start('feu', 10, 'raptorincel')).toBe(true)
    vi.advanceTimersByTime(BREEDING_DURATION_MS + 1)
    expect(breeding.completeIfDue('feu')).toBe(true)
    expect(breeding.collectEgg('feu')).toBe(true)
    expect(box.breeding[0].monId).toBe('salamiches')
  })
})
