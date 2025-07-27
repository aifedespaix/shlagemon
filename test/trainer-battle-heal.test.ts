import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import TrainerBattle from '../src/components/battle/Trainer.vue'
import { EQUILIBRE_RANK } from '../src/constants/battle'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { useTrainerBattleStore } from '../src/stores/trainerBattle'
import { useZoneStore } from '../src/stores/zone'
import { useZoneProgressStore } from '../src/stores/zoneProgress'

// Ensure player shlagemon heals a portion of lost hp between trainer battles

describe('trainer battle healing', () => {
  it('heals player and grants no xp between fights', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    expect(EQUILIBRE_RANK).toBe(2)

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
    player.hpCurrent -= 10
    const hpBefore = player.hpCurrent
    const xpBefore = player.xp
    await wrapper.vm.onEnd('win')
    const expected = hpBefore + Math.round((player.hp - hpBefore) * trainerStore.winHealPercent / 100)
    expect(player.hpCurrent).toBe(expected)
    expect(player.xp).toBe(xpBefore)
  })
})
