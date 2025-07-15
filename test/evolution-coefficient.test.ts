import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import abraquemar from '../src/data/shlagemons/10-15/abraquemar'
import alakalbar from '../src/data/shlagemons/evolutions/alakalbar'
import { useEvolutionStore } from '../src/stores/evolution'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { useZoneStore } from '../src/stores/zone'
import { xpForLevel } from '../src/utils/dexFactory'

describe('evolution coefficient bonus', () => {
  it('applies current zone rank when evolving', async () => {
    setActivePinia(createPinia())
    const zone = useZoneStore()
    const dex = useShlagedexStore()
    const evo = useEvolutionStore()
    vi.spyOn(evo, 'requestEvolution').mockResolvedValue(true)
    const rank = 4
    vi.spyOn(zone, 'getZoneRank').mockReturnValue(rank)
    zone.setZone('plaine-kekette')
    const mon = dex.createShlagemon(abraquemar)
    mon.rarity = 100
    await dex.gainXp(mon, xpForLevel(1) + xpForLevel(2))
    expect(mon.base.id).toBe(alakalbar.id)
    expect(mon.base.coefficient).toBe(alakalbar.coefficient * rank)
  })
})
