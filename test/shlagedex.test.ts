import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { toast } from 'vue3-toastify'
import { carapouffe } from '../src/data/shlagemons'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { applyStats, xpForLevel } from '../src/utils/dexFactory'

vi.mock('vue3-toastify', () => ({ toast: vi.fn() }))

const toastMock = vi.mocked(toast)

describe('shlagedex capture', () => {
  it('notifies when rarity increases', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    mon.rarity = 1
    toastMock.mockClear()
    dex.captureShlagemon(carapouffe)
    expect(mon.rarity).toBe(2)
    expect(toastMock).toHaveBeenCalledWith(
      `${mon.base.name} atteint la rareté ${mon.rarity} !`,
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

  it('captures enemy with same level and rarity', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const enemy = dex.createShlagemon(carapouffe)
    enemy.lvl = 17
    enemy.rarity = 42
    applyStats(enemy)
    const captured = dex.captureEnemy(enemy)
    expect(captured.lvl).toBe(17)
    expect(captured.rarity).toBe(42)
  })
})

describe('shlagedex highest level', () => {
  it('updates when a mon levels up', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    expect(dex.highestLevel).toBe(1)
    for (let i = 0; i < 9; i++)
      dex.gainXp(mon, xpForLevel(mon.lvl))
    expect(mon.lvl).toBe(10)
    expect(dex.highestLevel).toBe(10)
  })
})
