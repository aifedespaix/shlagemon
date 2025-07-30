import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { usePlaytimeStore } from '../src/stores/playtime'

/**
 * Ensures playtime increases once per minute.
 */
describe('playtime store', () => {
  it('increments minutes every minute', () => {
    vi.useFakeTimers()
    setActivePinia(createPinia())
    const store = usePlaytimeStore()
    expect(store.minutes).toBe(0)
    vi.advanceTimersByTime(60_000)
    expect(store.minutes).toBe(1)
    vi.advanceTimersByTime(120_000)
    expect(store.minutes).toBe(3)
    vi.useRealTimers()
  })
})
