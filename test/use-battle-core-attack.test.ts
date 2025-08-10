import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'

import { useBattleCore } from '../src/composables/useBattleCore'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useShlagedexStore } from '../src/stores/shlagedex'

vi.mock('../src/stores/audio', () => ({
  useAudioStore: () => ({
    playSfx: vi.fn(),
    isMusicEnabled: false,
  }),
}))

describe('useBattleCore.attack', () => {
  it('synchronizes reactive hp values after a manual attack', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const player = dex.createShlagemon(carapouffe)
    const enemy = dex.createShlagemon(carapouffe)
    dex.setActiveShlagemon(player)

    const core = useBattleCore({
      createEnemy: () => enemy,
    })
    core.startBattle(enemy)

    const initialHp = core.enemyHp.value
    core.attack()

    expect(enemy.hpCurrent).toBe(initialHp - 10)
    expect(core.enemyHp.value).toBe(enemy.hpCurrent)
  })
})
