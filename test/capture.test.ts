import { beforeEach, describe, expect, it, vi } from 'vitest'
import { balls } from '../src/data/items/shlageball'
import { carapouffe } from '../src/data/shlagemons'
import { tryCapture } from '../src/utils/capture'
import { createDexShlagemon } from '../src/utils/dexFactory'

describe('capture mechanics', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('succeeds when random is low', () => {
    const mon = createDexShlagemon(carapouffe)
    mon.hpCurrent = 0
    mon.rarity = 50
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(tryCapture(mon, balls[0])).toBe(true)
  })

  it('fails when random is high', () => {
    const mon = createDexShlagemon(carapouffe)
    mon.hpCurrent = mon.hp
    mon.rarity = 100
    vi.spyOn(Math, 'random').mockReturnValue(0.99)
    expect(tryCapture(mon, balls[0])).toBe(false)
  })
})
