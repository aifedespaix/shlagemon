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
    expect(inventory.useItem('oeuf-feu')).toBe(true)
    expect(eggs.eggs.length).toBe(1)

    vi.advanceTimersByTime(61_000)
    vi.runOnlyPendingTimers()
    expect(eggs.eggs.length).toBe(0)
    expect(dex.shlagemons.length).toBe(1)
    vi.useRealTimers()
  })
})
