import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { tryCapture } from '../src/utils/capture'

describe('capture potion', () => {
  it('applies bonus to capture chance', () => {
    vi.useFakeTimers()
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    dex.setActiveShlagemon(mon)

    const ball = { id: 'test', name: 't', description: '', price: 0, catchBonus: 1, animation: '' }
    mon.hpCurrent = 0
    mon.rarity = 99
    vi.spyOn(Math, 'random').mockReturnValue(0.1)
    expect(tryCapture(mon, ball)).toBe(false)
    dex.boostCapture(50)
    expect(tryCapture(mon, ball)).toBe(true)
    vi.useRealTimers()
  })
})
