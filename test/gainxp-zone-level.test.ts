import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { applyCurrentStats, applyStats, xpForLevel } from '../src/utils/dexFactory'

describe('gainXp zone level penalties', () => {
  it('halves xp when above zone max level', async () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    mon.lvl = 10
    applyStats(mon)
    applyCurrentStats(mon)
    const amount = xpForLevel(mon.lvl) - 1
    await dex.gainXp(mon, amount, undefined, undefined, 10)
    expect(mon.xp).toBe(Math.round(amount / 2))
  })

  it('divides xp by 10 when 5 levels above zone max', async () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    mon.lvl = 15
    applyStats(mon)
    applyCurrentStats(mon)
    const amount = xpForLevel(mon.lvl) - 1
    await dex.gainXp(mon, amount, undefined, undefined, 10)
    expect(mon.xp).toBe(Math.round(amount / 10))
  })
})
