import type { FinaleHpMemory } from '../src/utils/finaleHpMemory'
import { describe, expect, it, vi } from 'vitest'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { createDexShlagemon } from '../src/utils/dexFactory'
import {
  clampFinaleHp,

  recallFinaleHp,
  resetFinaleHpMemory,
  storeFinaleHp,
} from '../src/utils/finaleHpMemory'

describe('finale HP memory helpers', () => {
  it('clamps raw values inside the provided maximum', () => {
    expect(clampFinaleHp(120, 100)).toBe(100)
    expect(clampFinaleHp(-20, 100)).toBe(0)
    expect(clampFinaleHp(80.6, 99.2)).toBe(81)
  })

  it('stores and recalls HP for returning Shlagémons', () => {
    const memory: FinaleHpMemory = {}
    const random = vi.spyOn(Math, 'random').mockReturnValue(0.5)
    const mon = createDexShlagemon(carapouffe, false, 50)
    random.mockRestore()

    mon.hpCurrent = 120
    const stored = storeFinaleHp(memory, mon, 110)
    expect(stored).toBe(110)
    expect(memory[mon.id]).toBe(110)

    mon.hpCurrent = 5
    const recalled = recallFinaleHp(memory, mon, 130)
    expect(recalled).toBe(110)
  })

  it('returns full HP for Shlagémons without previous appearance', () => {
    const memory: FinaleHpMemory = {}
    const random = vi.spyOn(Math, 'random').mockReturnValue(0.3)
    const mon = createDexShlagemon(carapouffe, false, 30)
    random.mockRestore()

    const recalled = recallFinaleHp(memory, mon, 95)
    expect(recalled).toBe(95)
  })

  it('resets the stored HP after a battle concludes', () => {
    const memory: FinaleHpMemory = {}
    const random = vi.spyOn(Math, 'random').mockReturnValue(0.42)
    const mon = createDexShlagemon(carapouffe, false, 20)
    random.mockRestore()

    storeFinaleHp(memory, mon, 80)
    expect(Object.keys(memory)).toHaveLength(1)

    resetFinaleHpMemory(memory)
    expect(Object.keys(memory)).toHaveLength(0)
  })
})
