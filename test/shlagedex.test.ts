import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { toast } from 'vue3-toastify'
import { carapouffe, sacdepates } from '../src/data/shlagemons'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { useZoneStore } from '../src/stores/zone'
import { useZoneProgressStore } from '../src/stores/zoneProgress'
import { applyStats, createDexShlagemon, xpForLevel } from '../src/utils/dexFactory'

vi.mock('vue3-toastify', () => ({ toast: vi.fn() }))

const toastMock = vi.mocked(toast)

describe('shlagedex capture', () => {
  it('notifies when capturing a rarer duplicate', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    mon.rarity = 1
    mon.lvl = 10
    toastMock.mockClear()
    const enemy = createDexShlagemon(carapouffe)
    enemy.rarity = 5
    enemy.lvl = 3
    applyStats(enemy)
    dex.captureEnemy(enemy)
    expect(mon.rarity).toBe(5)
    expect(mon.lvl).toBe(6)
    expect(toastMock).toHaveBeenCalledWith(
      `${mon.base.name} gagne 4 points de rareté et perd 4 niveaux !`,
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
    const enemy = createDexShlagemon(carapouffe)
    enemy.lvl = 17
    enemy.rarity = 42
    applyStats(enemy)
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
    const enemy = createDexShlagemon(carapouffe)
    enemy.isShiny = true
    enemy.rarity = 1
    enemy.lvl = 10
    applyStats(enemy)
    const captured = dex.captureEnemy(enemy)
    expect(captured.id).toBe(existing.id)
    expect(existing.rarity).toBe(4)
    expect(existing.lvl).toBe(4)
    expect(existing.isShiny).toBe(true)
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

describe('rarity 100 coefficient update', () => {
  it('updates stats when rarity hits 100', async () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const progress = useZoneProgressStore()
    const zone = useZoneStore()

    const mon = dex.createShlagemon(carapouffe)
    mon.rarity = 99
    applyStats(mon)
    for (let i = 0; i < 4; i++)
      await dex.gainXp(mon, xpForLevel(mon.lvl))
    progress.defeatKing('plaine-kekette')
    await nextTick()
    dex.captureShlagemon(carapouffe)
    await nextTick()
    const rank = zone.getZoneRank('bois-de-bouffon')
    expect(mon.rarity).toBe(100)
    expect(mon.base.coefficient).toBe(carapouffe.coefficient * rank)
  })

  it('recalculates stats when a new zone unlocks', async () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const progress = useZoneProgressStore()
    const zone = useZoneStore()

    const mon = dex.createShlagemon(carapouffe)
    mon.rarity = 100
    applyStats(mon)
    await nextTick()
    expect(mon.base.coefficient).toBe(carapouffe.coefficient * zone.getZoneRank('plaine-kekette'))
    for (let i = 0; i < 4; i++)
      await dex.gainXp(mon, xpForLevel(mon.lvl))
    progress.defeatKing('plaine-kekette')
    await nextTick()
    const rank = zone.getZoneRank('bois-de-bouffon')
    expect(mon.base.coefficient).toBe(carapouffe.coefficient * rank)
  })
})
