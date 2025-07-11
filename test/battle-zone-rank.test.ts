import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import BattleMain from '../src/components/battle/BattleMain.vue'
import { EQUILIBRE_RANK } from '../src/constants/battle'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useEvolutionStore } from '../src/stores/evolution'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { useZoneStore } from '../src/stores/zone'
import { useZoneProgressStore } from '../src/stores/zoneProgress'
import { xpForLevel } from '../src/utils/dexFactory'
import * as spawnUtils from '../src/utils/spawn'

describe('zone rank scaling', () => {
  it('scales enemy coefficient with zone rank', async () => {
    vi.useFakeTimers()
    const pinia = createPinia()
    setActivePinia(pinia)
    const zone = useZoneStore()
    const dex = useShlagedexStore()
    const pickSpy = vi.spyOn(spawnUtils, 'pickRandomByCoefficient').mockReturnValue(carapouffe)
    const rank = 6
    vi.spyOn(zone, 'getZoneRank').mockReturnValue(rank)
    zone.setZone('marais-moudugenou')
    dex.createShlagemon(carapouffe)

    const wrapper = mount(BattleMain, {
      global: { plugins: [pinia], stubs: ['ProgressBar', 'ImageByBackground', 'BattleHeader', 'BattleRound', 'FightKingButton', 'ZoneMonsModal', 'CaptureLimitModal'] },
    })

    await Promise.resolve()
    vi.runOnlyPendingTimers()

    const enemy = (wrapper.vm as any).enemy
    expect(enemy.base.coefficient).toBe(carapouffe.coefficient * rank * EQUILIBRE_RANK)

    wrapper.unmount()
    pickSpy.mockRestore()
    vi.useRealTimers()
  })

  it('recomputes stats at rarity 100 with highest zone rank', async () => {
    setActivePinia(createPinia())
    const zone = useZoneStore()
    const dex = useShlagedexStore()
    const progress = useZoneProgressStore()
    const evo = useEvolutionStore()
    vi.spyOn(evo, 'requestEvolution').mockResolvedValue(true)
    const rank = 6
    vi.spyOn(zone, 'getZoneRank').mockReturnValue(rank)
    ;['plaine-kekette', 'bois-de-bouffon', 'chemin-du-slip', 'ravin-fesse-molle', 'precipice-nanard'].forEach(id => progress.defeatKing(id))
    dex.highestLevel = 50
    const mon = dex.createShlagemon(carapouffe)
    mon.rarity = 99
    await dex.gainXp(mon, xpForLevel(mon.lvl))
    dex.captureShlagemon(carapouffe)
    await Promise.resolve()
    expect(mon.rarity).toBe(100)
    expect(mon.base.coefficient).toBe(carapouffe.coefficient * rank)
  })
})
