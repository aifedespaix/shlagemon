import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { xpForLevel } from '../src/utils/dexFactory'

describe('gainXp heal percent', () => {
  it('heals only a portion of hp on level up', async () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    mon.hpCurrent = Math.floor(mon.hp / 2)
    const prevHp = mon.hpCurrent
    await dex.gainXp(mon, xpForLevel(mon.lvl), undefined, 15)
    const expected = Math.min(mon.hp, prevHp + Math.round(mon.hp * 15 / 100))
    expect(mon.hpCurrent).toBe(expected)
    expect(mon.lvl).toBe(2)
  })
})
