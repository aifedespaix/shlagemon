import { createPinia, setActivePinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { describe, expect, it, vi } from 'vitest'
import { createApp, nextTick } from 'vue'
import { useBreedingStore } from '../src/stores/breeding'
import { useEggStore } from '../src/stores/egg'
import { useGameStore } from '../src/stores/game'
import { BREEDING_DURATION_MS, breedingCost, COST_BASE_A, COST_GROWTH_C } from '../src/utils/breeding'

/**
 * Unit tests for breeding mechanics including cost calculation,
 * job scheduling, and persistence.
 */

describe('breedingCost', () => {
  it('returns base cost for rarity 1', () => {
    expect(breedingCost(1)).toBe(Math.round(COST_BASE_A))
  })

  it('returns max cost for rarity 100', () => {
    const expected = Math.round(COST_BASE_A * COST_GROWTH_C ** 99)
    expect(breedingCost(100)).toBe(expected)
  })

  it('computes cost for a mid-range rarity', () => {
    const rarity = 50
    const expected = Math.round(COST_BASE_A * COST_GROWTH_C ** (rarity - 1))
    expect(breedingCost(rarity)).toBe(expected)
  })
})

describe('breeding store', () => {
  it('deducts currency, schedules job and hatches egg', () => {
    vi.useFakeTimers()
    setActivePinia(createPinia())
    const breeding = useBreedingStore()
    const eggs = useEggStore()
    const game = useGameStore()
    game.addShlagidolar(10_000)

    const rarity = 10
    const cost = breedingCost(rarity)
    expect(breeding.start('feu', rarity)).toBe(true)
    expect(game.shlagidolar).toBe(10_000 - cost)

    vi.advanceTimersByTime(BREEDING_DURATION_MS - 1)
    expect(breeding.completeIfDue('feu')).toBe(false)
    vi.advanceTimersByTime(1)
    expect(breeding.completeIfDue('feu')).toBe(true)

    const egg = eggs.incubator[0]
    expect(egg.isBreeding).toBe(true)
    expect(egg.forcedRarity).toBe(rarity)
    vi.useRealTimers()
  })

  it('serializes and restores breeding jobs', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(1000)
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    const app = createApp({})
    app.use(pinia)
    setActivePinia(pinia)

    const breeding = useBreedingStore()
    const game = useGameStore()
    game.addShlagidolar(10_000)
    const rarity = 5
    breeding.start('eau', rarity)
    await nextTick()

    const stored = window.localStorage.getItem('breeding')
    expect(stored).toBe(
      JSON.stringify({
        byType: {
          eau: {
            type: 'eau',
            rarity,
            startedAt: 1000,
            endsAt: 1000 + BREEDING_DURATION_MS,
            status: 'running',
          },
        },
      }),
    )

    const pinia2 = createPinia()
    pinia2.use(piniaPluginPersistedstate)
    const app2 = createApp({})
    app2.use(pinia2)
    setActivePinia(pinia2)
    window.localStorage.setItem('breeding', stored as string)

    const restored = useBreedingStore()
    const job = restored.getJob('eau')
    expect(job).toEqual({
      type: 'eau',
      rarity,
      startedAt: 1000,
      endsAt: 1000 + BREEDING_DURATION_MS,
      status: 'running',
    })
    vi.useRealTimers()
  })
})
