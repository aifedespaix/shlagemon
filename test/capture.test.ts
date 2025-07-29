import { beforeEach, describe, expect, it, vi } from 'vitest'
import { balls } from '../src/data/items/shlageball'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { captureChanceFromHp, tryCapture } from '../src/utils/capture'
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

  it('level 33 halves capture chance', () => {
    const mon = createDexShlagemon(carapouffe, false, 33)
    mon.hp = 100
    mon.hpCurrent = 1
    vi.spyOn(Math, 'random').mockReturnValue(0.6)
    expect(tryCapture(mon, balls[2])).toBe(false)
  })
})
