import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import TrainerBattle from '../src/components/battle/TrainerBattle.vue'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { useTrainerBattleStore } from '../src/stores/trainerBattle'
import { useZoneStore } from '../src/stores/zone'
import { useZoneProgressStore } from '../src/stores/zoneProgress'

// Ensure player shlagemon is not healed between trainer battles

describe('trainer battle healing', () => {
  it('keeps player hp between fights', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)

    const dex = useShlagedexStore()
    const trainerStore = useTrainerBattleStore()
    const zone = useZoneStore()
    useZoneProgressStore() // initialize store used by component

    zone.setZone('plaine-kekette')
    const player = dex.createShlagemon(carapouffe)
    dex.setActiveShlagemon(player)

    trainerStore.setQueue([
      {
        id: 'test',
        character: { id: 'test', name: 'Test', gender: 'male' },
        dialogBefore: '',
        dialogAfter: '',
        reward: 1,
        shlagemons: [
          { baseId: carapouffe.id, level: 1 },
          { baseId: carapouffe.id, level: 1 },
        ],
      },
    ])

    const wrapper = mount(TrainerBattle, {
      global: {
        plugins: [pinia],
        stubs: ['BattleRound', 'BattleHeader', 'CharacterImage', 'Button', 'ImageByBackground'],
      },
    })

    wrapper.vm.startFight()
    player.hpCurrent -= 1
    const hpBefore = player.hpCurrent
    await wrapper.vm.onEnd('win')
    expect(player.hpCurrent).toBe(hpBefore)
  })
})
