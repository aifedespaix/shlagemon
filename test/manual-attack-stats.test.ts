import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { useManualAttackStatsStore } from '../src/stores/manualAttackStats'

/**
 * Validates manual attack statistics per combat.
 */
describe('manual attack stats store', () => {
  it('records clicks and computes cps', () => {
    vi.useFakeTimers()
    setActivePinia(createPinia())
    const store = useManualAttackStatsStore()
    store.startCombat()
    store.registerClick()
    store.registerClick()
    vi.advanceTimersByTime(1000)
    store.registerClick()
    store.registerClick()
    vi.advanceTimersByTime(1000)
    store.endCombat()

    expect(store.history.length).toBe(1)
    const stats = store.history[0]
    expect(stats.clicks).toBe(4)
    expect(stats.duration).toBeCloseTo(2, 1)
    expect(stats.cps).toBeCloseTo(2, 1)
    vi.useRealTimers()
  })
})
