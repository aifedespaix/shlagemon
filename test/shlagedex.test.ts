import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { toast } from 'vue3-toastify'
import { carapouffe } from '../src/data/shlagemons'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { xpForLevel } from '../src/utils/dexFactory'

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
