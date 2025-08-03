import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import BattleRound from '../src/components/battle/Round.vue'
import BattleShlagemon from '../src/components/battle/Shlagemon.vue'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useMainPanelStore } from '../src/stores/mainPanel'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { useZoneStore } from '../src/stores/zone'

describe('battle round enemy owned indicator', () => {
  it('passes owned prop when enemy is already captured', async () => {
    vi.useFakeTimers()
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    const zone = useZoneStore()
    const panel = useMainPanelStore()
    zone.setZone('plaine-kekette')
    panel.current = 'battle'
    const captured = dex.createShlagemon(carapouffe)
    dex.addShlagemon(captured)
    const player = dex.createShlagemon(carapouffe)
    dex.setActiveShlagemon(player)
    const enemy = dex.createShlagemon(carapouffe)
    const wrapper = mount(BattleRound, {
      props: { player, enemy },
      global: {
        plugins: [pinia],
        stubs: {
          BattleAttackCursor: true,
          BattleToast: true,
          ShlagemonXpBar: true,
          EffectBadge: true,
          DiseaseBadge: true,
          InventoryWearableItemIcon: true,
          ShlagemonImage: true,
          UiTooltip: { template: '<div><slot /></div>' },
          UiProgressBar: true,
        },
      },
    })
    await nextTick()
    const shlagemons = wrapper.findAllComponents(BattleShlagemon)
    const enemyComp = shlagemons.at(1)!
    expect(enemyComp.props('owned')).toBe(true)
    expect(enemyComp.props('showBall')).toBe(true)
    wrapper.unmount()
    vi.useRealTimers()
  })
})
