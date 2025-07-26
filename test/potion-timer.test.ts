import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('potion timer', () => {
  it('extends and replaces potion effects', () => {
    vi.useFakeTimers()
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    dex.setActiveShlagemon(mon)

    dex.boostDefense(10)
    expect(dex.effects.length).toBe(1)
    const firstExpire = dex.effects[0].expiresAt
    vi.advanceTimersByTime(60_000)
    dex.boostDefense(10)
    expect(dex.effects[0].expiresAt).toBe(firstExpire + 600_000)

    const baseDefense = mon.baseStats.defense
    dex.boostDefense(25)
    expect(dex.effects.length).toBe(1)
    expect(dex.effects[0].percent).toBe(25)
    expect(dex.effectiveDefense(mon)).toBe(Math.round(baseDefense * (1 + 25 / 100)))

    vi.advanceTimersByTime(600_000)
    vi.runOnlyPendingTimers()
    expect(dex.effects.length).toBe(0)
    expect(dex.effectiveDefense(mon)).toBe(baseDefense)
    vi.useRealTimers()
  })
})
