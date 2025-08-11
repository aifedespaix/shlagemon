import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { usePlaytimeStore } from '../src/stores/playtime'

/**
 * Ensures playtime increases every second and minutes are derived correctly.
 */
describe('playtime store', () => {
  it('increments seconds and computes minutes', () => {
    vi.useFakeTimers()
    setActivePinia(createPinia())
    const store = usePlaytimeStore()
    expect(store.seconds).toBe(0)
    expect(store.minutes).toBe(0)
    vi.advanceTimersByTime(1_000)
    expect(store.seconds).toBe(1)
    expect(store.minutes).toBe(0)
    vi.advanceTimersByTime(59_000)
    expect(store.seconds).toBe(60)
    expect(store.minutes).toBe(1)
    vi.advanceTimersByTime(120_000)
    expect(store.seconds).toBe(180)
    expect(store.minutes).toBe(3)
    vi.useRealTimers()
  })
})
