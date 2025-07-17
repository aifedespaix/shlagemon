import { beforeEach, describe, expect, it, vi } from 'vitest'
import { balls } from '../src/data/items/shlageball'
import { carapouffe } from '../src/data/shlagemons'
import { captureChanceFromHp, tryCapture } from '../src/utils/capture'
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

  it('hyper ball versus strong foe gives around 10% chance', () => {
    const mon = createDexShlagemon(carapouffe, false, 1, 100)
    mon.coefficient = 1000
    mon.hp = 100
    mon.hpCurrent = 10
    const hpChance = captureChanceFromHp(mon.hpCurrent / mon.hp)
    const coefMod = 1 / Math.cbrt(mon.coefficient)
    const levelMod = 1 / (1 + mon.lvl / 40)
    const difficultyMod = 1.3
    const chance = Math.min(100, hpChance * coefMod * levelMod * balls[2].catchBonus * difficultyMod)
    expect(chance).toBeCloseTo(10, 1)
  })

  it('regular ball against lvl1 coefficient1 foe at full HP is almost guaranteed', () => {
    const mon = createDexShlagemon(carapouffe, false, 1, 1)
    mon.coefficient = 1
    mon.hpCurrent = mon.hp
    const hpChance = captureChanceFromHp(mon.hpCurrent / mon.hp)
    const coefMod = 1 / Math.cbrt(mon.coefficient)
    const levelMod = 1 / (1 + mon.lvl / 40)
    const difficultyMod = 1.3
    const chance = Math.min(100, hpChance * coefMod * levelMod * balls[0].catchBonus * difficultyMod)
    expect(chance).toBeGreaterThanOrEqual(95)
  })
})
