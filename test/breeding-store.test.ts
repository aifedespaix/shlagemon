import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { raptorincel } from '../src/data/shlagemons/evolutions/raptorincel'
import { salamiches } from '../src/data/shlagemons/salamiches'
import { useBreedingStore } from '../src/stores/breeding'
import { useEggBoxStore } from '../src/stores/eggBox'
import { useGameStore } from '../src/stores/game'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { BREEDING_DURATION_MS } from '../src/utils/breeding'
import { createDexShlagemon } from '../src/utils/dexFactory'

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

    const parent = createDexShlagemon(salamiches)
    useShlagedexStore().shlagemons.push(parent)
    expect(breeding.start('feu', 10, parent)).toBe(true)
    expect(parent.busy).toBe(true)
    expect(breeding.start('feu', 10, parent)).toBe(false)

    vi.advanceTimersByTime(BREEDING_DURATION_MS + 1)
    expect(breeding.completeIfDue('feu')).toBe(true)
    expect(parent.busy).toBe(false)
    expect(breeding.start('feu', 10, parent)).toBe(false)
    expect(box.breeding.length).toBe(0)

    expect(breeding.collectEgg('feu')).toBe(true)
    expect(box.breeding.length).toBe(1)
    expect(box.breeding[0].monId).toBe('salamiches')

    expect(breeding.start('feu', 10, parent)).toBe(true)
  })

  it('breeds evolved shlagemon and returns base ancestor egg', () => {
    const breeding = useBreedingStore()
    const game = useGameStore()
    const box = useEggBoxStore()
    game.shlagidolar = 1_000_000

    const parent = createDexShlagemon(raptorincel)
    useShlagedexStore().shlagemons.push(parent)
    expect(breeding.start('feu', 10, parent)).toBe(true)
    vi.advanceTimersByTime(BREEDING_DURATION_MS + 1)
    expect(breeding.completeIfDue('feu')).toBe(true)
    expect(parent.busy).toBe(false)
    expect(breeding.collectEgg('feu')).toBe(true)
    expect(box.breeding[0].monId).toBe('salamiches')
  })
})
