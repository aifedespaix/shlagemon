import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { useZoneProgressStore } from '../src/stores/zoneProgress'
import { useZoneVisitStore } from '../src/stores/zoneVisit'
import { carapouffe } from '../src/data/shlagemons'
import { xpForLevel } from '../src/utils/dexFactory'

describe('zone visit store', () => {
  it('does not highlight the first zone', () => {
    setActivePinia(createPinia())
    const visit = useZoneVisitStore()
    expect(visit.hasNewZone).toBe(false)
  })

  it('highlights when a new zone unlocks', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    const progress = useZoneProgressStore()
    const visit = useZoneVisitStore()
    const mon = dex.createShlagemon(carapouffe)
    progress.defeatKing('plaine-kekette')
    for (let i = 0; i < 4; i++)
      await dex.gainXp(mon, xpForLevel(mon.lvl))
    expect(visit.hasNewZone).toBe(true)
  })
})
