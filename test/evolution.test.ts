import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import abraquemar from '../src/data/shlagemons/10-15/abraquemar'
import alakalbar from '../src/data/shlagemons/evolutions/alakalbar'
import { useEvolutionStore } from '../src/stores/evolution'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { xpForLevel } from '../src/utils/dexFactory'

describe('evolution', () => {
  it('prompts before evolution when allowed', async () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const evo = useEvolutionStore()
    const spy = vi.spyOn(evo, 'requestEvolution').mockResolvedValue(true)
    const mon = dex.createShlagemon(abraquemar)
    await dex.gainXp(mon, xpForLevel(1) + xpForLevel(2))
    expect(mon.base.id).toBe(alakalbar.id)
    expect(mon.lvl).toBe(3)
    expect(spy).toHaveBeenCalled()
  })

  it('skips evolution when not allowed', async () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const evo = useEvolutionStore()
    const spy = vi.spyOn(evo, 'requestEvolution').mockResolvedValue(true)
    const mon = dex.createShlagemon(abraquemar)
    mon.allowEvolution = false
    await dex.gainXp(mon, xpForLevel(1) + xpForLevel(2))
    expect(spy).not.toHaveBeenCalled()
    expect(mon.base.id).toBe(abraquemar.id)
    expect(mon.lvl).toBe(3)
  })
})
