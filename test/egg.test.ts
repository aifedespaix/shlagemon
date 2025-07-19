import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { useEggStore } from '../src/stores/egg'
import { useInventoryStore } from '../src/stores/inventory'
import { useShlagedexStore } from '../src/stores/shlagedex'

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
    expect(eggs.incubator).not.toBeNull()

    vi.advanceTimersByTime(61_000)
    expect(eggs.isReady).toBe(true)
    const mon = eggs.hatchEgg()
    expect(mon).not.toBeNull()
    expect(dex.shlagemons.length).toBe(1)
    vi.useRealTimers()
  })
})
