import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { useEggStore } from '../src/stores/egg'
import { useInventoryStore } from '../src/stores/inventory'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { hatchDurationForRarity } from '../src/utils/egg'

describe('egg workflow', () => {
  it('acquires and hatches eggs', () => {
    vi.useFakeTimers()
    setActivePinia(createPinia())
    const inventory = useInventoryStore()
    const eggs = useEggStore()
    const dex = useShlagedexStore()

    inventory.add('oeuf-feu')
    eggs.startIncubation('feu')
    inventory.remove('oeuf-feu')
    expect(eggs.incubator.length).toBe(1)

    const egg = eggs.incubator[0]
    const duration = egg.hatchesAt - egg.startedAt
    expect(egg.rarity).toBeGreaterThanOrEqual(1)
    expect(egg.rarity).toBeLessThanOrEqual(100)
    expect(duration).toBe(hatchDurationForRarity(egg.rarity))
    expect(egg.startedAt).toBeLessThanOrEqual(Date.now())
    vi.advanceTimersByTime(duration + 1)
    expect(eggs.isReady(egg)).toBe(true)
    const mon = eggs.hatchEgg(egg.id)!
    expect(mon).not.toBeNull()
    expect(mon.rarity).toBe(egg.rarity)
    expect(dex.shlagemons.length).toBe(1)
    vi.useRealTimers()
  })
})
