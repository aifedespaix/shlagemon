import { beforeEach, describe, expect, it, vi } from 'vitest'
import { balls } from '../src/data/items/shlageball'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { captureChanceFromHp, getCaptureChance, tryCapture } from '../src/utils/capture'
import { createDexShlagemon } from '../src/utils/dexFactory'

describe('capture mechanics', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('capture chance from hp is linear', () => {
    expect(captureChanceFromHp(0.5)).toBeCloseTo(44.5, 1)
  })

  it('basic ball cannot capture high level foe', () => {
    const mon = createDexShlagemon(carapouffe, false, 40)
    mon.hpCurrent = 0
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(tryCapture(mon, balls[0])).toBe(false)
  })

  it('super ball doubles chance for low level foe', () => {
    const mon = createDexShlagemon(carapouffe, false, 20)
    mon.hp = 100
    mon.hpCurrent = 1
    vi.spyOn(Math, 'random').mockReturnValue(0.3)
    expect(tryCapture(mon, balls[1])).toBe(true)
  })

  it('rarity reduces capture probability', () => {
    const mon = createDexShlagemon(carapouffe, false, 70)
    mon.hp = 100
    mon.hpCurrent = 1
    mon.rarity = 100
    vi.spyOn(Math, 'random').mockReturnValue(0.3)
    expect(tryCapture(mon, balls[2])).toBe(false)
  })

  it('higher levels reduce capture chance', () => {
    const low = createDexShlagemon(carapouffe, false, 10)
    const high = createDexShlagemon(carapouffe, false, 80)
    low.hp = high.hp = 100
    low.hpCurrent = high.hpCurrent = 50
    const chanceLow = getCaptureChance(low, balls[0])
    const chanceHigh = getCaptureChance(high, balls[0])
    expect(chanceHigh).toBeLessThan(chanceLow)
  })

  it('computes zero capture chance when ball cannot capture', () => {
    const mon = createDexShlagemon(carapouffe, false, 80)
    mon.hp = 100
    mon.hpCurrent = 1
    expect(getCaptureChance(mon, balls[0])).toBe(0)
  })

  it('stronger balls increase capture chance', () => {
    const mon = createDexShlagemon(carapouffe, false, 20)
    mon.hp = 100
    mon.hpCurrent = 70
    const chanceSuper = getCaptureChance(mon, balls[1])
    const chanceHyper = getCaptureChance(mon, balls[2])
    expect(chanceSuper).toBeGreaterThan(0)
    expect(chanceHyper).toBeGreaterThan(chanceSuper)
  })

  it('hyper ball versus strong foe gives around 25% chance', () => {
    const mon = createDexShlagemon(carapouffe, false, 80)
    mon.hp = 100
    mon.hpCurrent = 62
    mon.rarity = 1
    const chance = getCaptureChance(mon, balls[2])
    expect(chance).toBeCloseTo(26.6, 1)
  })
})
