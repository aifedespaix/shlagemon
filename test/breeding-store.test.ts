import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { useBreedingStore } from '../src/stores/breeding'
import { useEggStore } from '../src/stores/egg'
import { useGameStore } from '../src/stores/game'
import { BREEDING_DURATION_MS, breedingCost } from '../src/utils/breeding'

describe('breeding store', () => {
  it('fails to start without funds', () => {
    setActivePinia(createPinia())
    const breeding = useBreedingStore()
    expect(breeding.start('feu', 5)).toBe(false)
  })

  it('starts and completes a breeding job', () => {
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
    vi.advanceTimersByTime(2)
    expect(breeding.completeIfDue('feu')).toBe(true)

    expect(eggs.incubator.length).toBe(1)
    const egg = eggs.incubator[0]
    expect(egg.isBreeding).toBe(true)
    expect(egg.forcedRarity).toBe(rarity)

    breeding.clearFinished()
    expect(breeding.getJob('feu')).toBeNull()
    vi.useRealTimers()
  })
})
