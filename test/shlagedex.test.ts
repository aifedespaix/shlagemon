import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { sacdepates } from '../src/data/shlagemons/01-05/sacdepates'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { i18n } from '../src/modules/i18n'
import { toast } from '../src/modules/toast'
import { useShlagedexStore } from '../src/stores/shlagedex'
import {
  applyCurrentStats,
  applyStats,
  baseStats,
  createDexShlagemon,
  statWithRarity,
  xpForLevel,
} from '../src/utils/dexFactory'

vi.mock('../src/modules/toast', () => {
  const fn: any = vi.fn()
  fn.success = vi.fn()
  fn.POSITION = { TOP_CENTER: 'top-center' }
  return { toast: fn }
})

const toastMock = vi.mocked(toast)

describe('shlagedex capture', () => {
  it('notifies when capturing a rarer duplicate', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    mon.rarity = 1
    mon.lvl = 10
    toastMock.mockClear()
    const enemy = createDexShlagemon(carapouffe, false, 3)
    enemy.rarity = 5
    applyStats(enemy)
    applyCurrentStats(enemy)
    dex.captureEnemy(enemy)
    expect(mon.rarity).toBe(5)
    expect(mon.lvl).toBe(6)
    expect(toastMock).toHaveBeenCalledWith(
      `${i18n.global.t(mon.base.name)} gagne 4 points de rareté et perd 4 niveaux !`,
    )
  })

  it('uses singular when only one point and one level are gained', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    mon.rarity = 1
    mon.lvl = 5
    toastMock.mockClear()
    const enemy = createDexShlagemon(carapouffe, false, 4)
    enemy.rarity = 2
    applyStats(enemy)
    applyCurrentStats(enemy)
    dex.captureEnemy(enemy)
    expect(mon.rarity).toBe(2)
    expect(mon.lvl).toBe(4)
    expect(toastMock).toHaveBeenCalledWith(
      `${i18n.global.t(mon.base.name)} gagne 1 point de rareté et perd 1 niveau !`,
    )
  })

  it('turns existing mon shiny if duplicate is shiny', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    mon.isShiny = false
    expect(mon.isShiny).toBe(false)
    dex.captureShlagemon(carapouffe, true)
    expect(mon.isShiny).toBe(true)
  })

  it('captures new enemy with same level and rarity', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const enemy = createDexShlagemon(carapouffe, false, 17)
    enemy.rarity = 42
    applyStats(enemy)
    applyCurrentStats(enemy)
    const captured = dex.captureEnemy(enemy)
    expect(captured.lvl).toBe(17)
    expect(captured.rarity).toBe(42)
  })

  it('handles weaker duplicate enemy', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const existing = dex.createShlagemon(carapouffe)
    existing.rarity = 3
    existing.lvl = 5
    applyStats(existing)
    applyCurrentStats(existing)
    const enemy = createDexShlagemon(carapouffe, false, 10)
    enemy.isShiny = true
    enemy.rarity = 1
    applyStats(enemy)
    applyCurrentStats(enemy)
    const captured = dex.captureEnemy(enemy)
    expect(captured.id).toBe(existing.id)
    expect(existing.rarity).toBe(4)
    expect(existing.lvl).toBe(4)
    expect(existing.isShiny).toBe(true)
  })

  it('warns when capturing duplicate at max rarity via captureShlagemon', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    mon.rarity = 100
    mon.lvl = 5
    toastMock.mockClear()
    const result = dex.captureShlagemon(carapouffe)
    expect(result.id).toBe(mon.id)
    expect(mon.rarity).toBe(100)
    expect(mon.lvl).toBe(5)
    expect(toastMock).toHaveBeenCalledWith(
      'Vous avez déjà ce Shlagémon au maximum de sa rareté',
    )
  })

  it('warns when capturing duplicate at max rarity via captureEnemy', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const existing = dex.createShlagemon(carapouffe)
    existing.rarity = 100
    existing.lvl = 8
    const enemy = createDexShlagemon(carapouffe, false, 20)
    enemy.rarity = 100
    applyStats(enemy)
    toastMock.mockClear()
    const result = dex.captureEnemy(enemy)
    expect(result.id).toBe(existing.id)
    expect(existing.rarity).toBe(100)
    expect(existing.lvl).toBe(8)
    expect(toastMock).toHaveBeenCalledWith(
      'Vous avez déjà ce Shlagémon au maximum de sa rareté',
    )
  })

  it('turns rarity 100 mon shiny via captureShlagemon when capturing shiny duplicate', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    mon.rarity = 100
    mon.isShiny = false
    const result = dex.captureShlagemon(carapouffe, true)
    expect(result.id).toBe(mon.id)
    expect(mon.isShiny).toBe(true)
  })

  it('turns rarity 100 mon shiny via captureEnemy when capturing shiny enemy', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    mon.rarity = 100
    mon.isShiny = false
    const enemy = createDexShlagemon(carapouffe, true, 20)
    enemy.rarity = 100
    applyStats(enemy)
    applyCurrentStats(enemy)
    const result = dex.captureEnemy(enemy)
    expect(result.id).toBe(mon.id)
    expect(mon.isShiny).toBe(true)
  })

  it('merges stats when capturing a legendary-profile duplicate', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const existing = dex.createShlagemon(carapouffe)
    existing.rarity = 20
    existing.lvl = 50
    applyStats(existing)
    applyCurrentStats(existing)
    const enemy = createDexShlagemon(carapouffe, true, 200)
    enemy.rarity = 60
    applyStats(enemy)
    applyCurrentStats(enemy)
    enemy.captureProfile = 'legendary'
    toastMock.mockClear()
    const result = dex.captureEnemy(enemy)
    expect(result.id).toBe(existing.id)
    expect(existing.captureCount).toBe(2)
    expect(existing.isShiny).toBe(true)
    expect(existing.lvl).toBe(200)
    expect(existing.rarity).toBe(60)
    expect(existing.attack).toBeGreaterThanOrEqual(enemy.attack)
    expect(existing.defense).toBeGreaterThanOrEqual(enemy.defense)
    expect(existing.hp).toBeGreaterThanOrEqual(enemy.hp)
    expect(existing.smelling).toBeGreaterThanOrEqual(enemy.smelling)
    expect(toastMock).toHaveBeenCalledWith(
      `${i18n.global.t(existing.base.name)} fusionne ses stats : seules les meilleures valeurs sont conservées !`,
    )
  })
})

describe('shlagedex highest level', () => {
  it('updates when a mon levels up', async () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    expect(dex.highestLevel).toBe(1)
    for (let i = 0; i < 9; i++)
      await dex.gainXp(mon, xpForLevel(mon.lvl))
    expect(mon.lvl).toBe(10)
    expect(dex.highestLevel).toBe(10)
  })
})

describe('completable ids', () => {
  it('placeholder', () => {
    expect(true).toBe(true)
  })
})

describe('potential completion percent', () => {
  it('counts captured mons from accessible zones', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    dex.captureShlagemon(sacdepates)
    expect(Math.round(dex.potentialCompletionPercent)).toBe(25)
  })
})

describe('duplicate capture at max rarity with both methods', () => {
  it('keeps level and rarity unchanged and warns in French', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    mon.rarity = 100
    mon.lvl = 12

    toastMock.mockClear()
    const sameBaseEnemy = createDexShlagemon(carapouffe, false, 20)
    sameBaseEnemy.rarity = 100
    applyStats(sameBaseEnemy)
    applyCurrentStats(sameBaseEnemy)

    // capture via base
    const result1 = dex.captureShlagemon(carapouffe)
    expect(result1.id).toBe(mon.id)
    expect(mon.rarity).toBe(100)
    expect(mon.lvl).toBe(12)
    expect(toastMock).toHaveBeenCalledWith(
      'Vous avez déjà ce Shlagémon au maximum de sa rareté',
    )

    toastMock.mockClear()
    // capture via enemy instance
    const result2 = dex.captureEnemy(sameBaseEnemy)
    expect(result2.id).toBe(mon.id)
    expect(mon.rarity).toBe(100)
    expect(mon.lvl).toBe(12)
    expect(toastMock).toHaveBeenCalledWith(
      'Vous avez déjà ce Shlagémon au maximum de sa rareté',
    )
  })
})

describe('rarity 100 coefficient update', () => {
  it('updates stats when rarity hits 100', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    mon.rarity = 99
    applyStats(mon)
    applyCurrentStats(mon)
    const enemy = createDexShlagemon(carapouffe, false, 1)
    enemy.rarity = 100
    applyStats(enemy)
    applyCurrentStats(enemy)
    dex.captureEnemy(enemy)
    expect(mon.rarity).toBe(100)
    const expected = statWithRarity(baseStats.defense, 100)
    expect(mon.baseStats.defense).toBe(expected)
    expect(mon.defense).toBe(expected)
  })
})

describe('rarity 100 base stats persistence', () => {
  it('keeps baseStats identical when leveling', async () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    mon.rarity = 100
    applyStats(mon)
    applyCurrentStats(mon)
    const before = { ...mon.baseStats }
    const hp = mon.hp
    for (let i = 0; i < 3; i++)
      await dex.gainXp(mon, xpForLevel(mon.lvl))
    expect(mon.baseStats).toEqual(before)
    expect(mon.hp).toBeGreaterThan(hp)
  })
})
