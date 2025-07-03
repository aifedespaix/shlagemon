import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import abraquemar from '../src/data/shlagemons/abraquemar'
import alakalbar from '../src/data/shlagemons/alakalbar'
import { useEvolutionStore } from '../src/stores/evolution'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { xpForLevel } from '../src/utils/dexFactory'

describe('evolution', () => {
  it('evolves when reaching level condition', async () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const evo = useEvolutionStore()
    vi.spyOn(evo, 'requestEvolution').mockResolvedValue(true)
    const mon = dex.createShlagemon(abraquemar)
    await dex.gainXp(mon, xpForLevel(1) + xpForLevel(2))
    expect(mon.base.id).toBe(alakalbar.id)
    expect(mon.lvl).toBe(3)
  })
})
