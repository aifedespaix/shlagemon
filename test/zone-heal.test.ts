import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import BattleMain from '../src/components/battle/Main.vue'
import { EQUILIBRE_RANK } from '../src/constants/battle'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { useZoneStore } from '../src/stores/zone'

// Ensure selected Shlagémon heals when zone changes and battle restarts

describe('zone change healing', () => {
  it('heals active shlagemon on zone change', async () => {
    vi.useFakeTimers()
    const pinia = createPinia()
    setActivePinia(pinia)
    expect(EQUILIBRE_RANK).toBe(2)
    const dex = useShlagedexStore()
    const zone = useZoneStore()

    const mon = dex.createShlagemon(carapouffe)
    zone.setZone('plaine-kekette')

    const wrapper = mount(BattleMain, {
      global: {
        plugins: [pinia],
        stubs: ['ProgressBar', 'ImageByBackground'],
      },
    })

    // let initial battle start
    await Promise.resolve()
    vi.runOnlyPendingTimers()

    // injure the mon
    mon.hpCurrent = Math.floor(mon.hp / 2)

    // change zone, triggering new battle
    zone.setZone('bois-de-bouffon')
    await Promise.resolve()
    vi.runOnlyPendingTimers()

    expect(mon.hpCurrent).toBe(mon.hp)
    wrapper.unmount()
    vi.useRealTimers()
  })
})
