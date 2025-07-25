import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import jeunebelette from '../src/data/shlagemons/01-05/jeunebelette'
import vieuxBlaireau from '../src/data/shlagemons/evolutions/vieuxblaireau'
import { useEvolutionStore } from '../src/stores/evolution'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { useZoneStore } from '../src/stores/zone'
import { useZoneProgressStore } from '../src/stores/zoneProgress'
import { xpForLevel } from '../src/utils/dexFactory'

describe('evolution coefficient bonus', () => {
  it('uses level zone rank when evolving', async () => {
    setActivePinia(createPinia())
    const zone = useZoneStore()
    const progress = useZoneProgressStore()
    const dex = useShlagedexStore()
    const evo = useEvolutionStore()
    vi.spyOn(evo, 'requestEvolution').mockResolvedValue(true)
    progress.defeatKing('plaine-kekette')
    zone.setZone('plaine-kekette')
    const mon = dex.createShlagemon(jeunebelette)
    await dex.gainXp(mon, xpForLevel(1) + xpForLevel(2) + xpForLevel(3) + xpForLevel(4))
    const rank = zone.getZoneRank('bois-de-bouffon')
    expect(mon.base.id).toBe(vieuxBlaireau.id)
    expect(mon.coefficient).toBe((mon.lvl + 1) * rank)
  })
})
