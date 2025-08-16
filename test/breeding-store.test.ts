import type { EggType } from '../src/stores/egg'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { raptorincel } from '../src/data/shlagemons/evolutions/raptorincel'
import { salamiches } from '../src/data/shlagemons/salamiches'
import { useBreedingStore } from '../src/stores/breeding'
import { useEggBoxStore } from '../src/stores/eggBox'
import { useGameStore } from '../src/stores/game'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { BREEDING_DURATION_MS } from '../src/utils/breeding'

vi.mock('../src/modules/toast', () => ({ toast: { success: vi.fn() } }))
vi.mock('../src/modules/i18n', () => ({ i18n: { global: { t: (k: string) => k } } }))

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
    const dex = useShlagedexStore()
    game.shlagidolar = 1_000_000

    const mon = dex.createShlagemon(salamiches)
    const type = mon.base.types[0].id as EggType
    expect(breeding.start(mon)).toBe(true)
    expect(mon.busy).toBe(true)
    expect(breeding.start(mon)).toBe(false)

    vi.advanceTimersByTime(BREEDING_DURATION_MS + 1000)
    expect(breeding.getJob(type)?.status).toBe('completed')
    expect(mon.busy).toBe(false)
    expect(breeding.start(mon)).toBe(false)
    expect(box.breeding.length).toBe(0)

    expect(breeding.collectEgg(type)).toBe(true)
    expect(box.breeding.length).toBe(1)
    expect(box.breeding[0].monId).toBe('salamiches')

    expect(breeding.start(mon)).toBe(true)
  })

  it('breeds evolved shlagemon and returns base ancestor egg', () => {
    const breeding = useBreedingStore()
    const game = useGameStore()
    const box = useEggBoxStore()
    const dex = useShlagedexStore()
    game.shlagidolar = 1_000_000

    const mon = dex.createShlagemon(raptorincel)
    const type = mon.base.types[0].id as EggType
    expect(breeding.start(mon)).toBe(true)
    vi.advanceTimersByTime(BREEDING_DURATION_MS + 1000)
    expect(breeding.collectEgg(type)).toBe(true)
    expect(box.breeding[0].monId).toBe('salamiches')
  })
})
