import type { BaseShlagemon } from '../src/type'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { shlagemonTypes } from '../src/data/shlagemons-type'
import abraquemar from '../src/data/shlagemons/10-15/abraquemar'
import alakalbar from '../src/data/shlagemons/evolutions/alakalbar'
import kadavrebras from '../src/data/shlagemons/evolutions/kadavrebras'
import { useEvolutionStore } from '../src/stores/evolution'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { useZoneStore } from '../src/stores/zone'
import { xpForLevel } from '../src/utils/dexFactory'

describe('evolution', () => {
  it('prompts before evolution when allowed', async () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const evo = useEvolutionStore()
    const spy = vi.spyOn(evo, 'requestEvolution').mockResolvedValue(true)
    const mon = dex.createShlagemon(abraquemar)
    mon.lvl = 45
    await dex.gainXp(mon, xpForLevel(mon.lvl))
    expect(mon.base.id).toBe(kadavrebras.id)
    expect(mon.lvl).toBe(46)
    expect(spy).toHaveBeenCalled()
  })

  it('skips evolution when not allowed', async () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const evo = useEvolutionStore()
    const spy = vi.spyOn(evo, 'requestEvolution').mockResolvedValue(true)
    const mon = dex.createShlagemon(abraquemar)
    mon.allowEvolution = false
    mon.lvl = 45
    await dex.gainXp(mon, xpForLevel(mon.lvl))
    expect(spy).not.toHaveBeenCalled()
    expect(mon.base.id).toBe(abraquemar.id)
    expect(mon.lvl).toBe(46)
  })

  it('disables future evolutions when user rejects', async () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const evo = useEvolutionStore()
    const mon = dex.createShlagemon(abraquemar)
    const promise = evo.requestEvolution(mon, alakalbar)
    evo.reject()
    await promise
    expect(mon.allowEvolution).toBe(false)
  })

  it('turns existing evolution shiny when evolving from a shiny mon', async () => {
    setActivePinia(createPinia())
    const zone = useZoneStore()
    const dex = useShlagedexStore()
    const evo = useEvolutionStore()
    vi.spyOn(evo, 'requestEvolution').mockResolvedValue(true)
    zone.setZone('plaine-kekette')
    const existing = dex.createShlagemon(kadavrebras)
    existing.isShiny = false
    const mon = dex.createShlagemon(abraquemar)
    mon.isShiny = true
    mon.lvl = 45
    await dex.gainXp(mon, xpForLevel(mon.lvl))
    expect(existing.isShiny).toBe(true)
  })

  it('processes only the first evolution when multiple levels are gained', async () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const evo = useEvolutionStore()
    const stage3: BaseShlagemon = {
      id: 'stage3',
      name: 'Stage3',
      description: '',
      types: [shlagemonTypes.psy],
      speciality: 'evolution2',
    }
    const stage2: BaseShlagemon = {
      id: 'stage2',
      name: 'Stage2',
      description: '',
      types: [shlagemonTypes.psy],
      speciality: 'evolution1',
      evolution: { base: stage3, condition: { type: 'lvl', value: 3 } },
    }
    const stage1: BaseShlagemon = {
      id: 'stage1',
      name: 'Stage1',
      description: '',
      types: [shlagemonTypes.psy],
      speciality: 'evolution0',
      evolution: { base: stage2, condition: { type: 'lvl', value: 2 } },
    }
    const mon = dex.createShlagemon(stage1)
    const spy = vi.spyOn(evo, 'requestEvolution').mockResolvedValue(true)
    await dex.gainXp(mon, xpForLevel(1) + xpForLevel(2))
    expect(spy).toHaveBeenCalledTimes(1)
    expect(mon.base.id).toBe(stage2.id)
    expect(mon.lvl).toBe(3)
  })

  it('ignores self-referential evolutions', async () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const evo = useEvolutionStore()
    const self: BaseShlagemon = {
      id: 'self',
      name: 'Self',
      description: '',
      types: [shlagemonTypes.psy],
      speciality: 'evolution0',
    }
    self.evolution = { base: self, condition: { type: 'lvl', value: 2 } }
    const mon = dex.createShlagemon(self)
    const spy = vi.spyOn(evo, 'requestEvolution')
    await dex.gainXp(mon, xpForLevel(1))
    expect(spy).not.toHaveBeenCalled()
    expect(mon.base.id).toBe('self')
    expect(mon.lvl).toBe(2)
  })
})
