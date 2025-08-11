import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { useBattleCore } from '../src/composables/useBattleCore'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useBattleStore } from '../src/stores/battle'

import { useShlagedexStore } from '../src/stores/shlagedex'

// Spy on battle effect notifications
const showEffect = vi.fn()
vi.mock('~/composables/battleEngine', () => ({
  useBattleEffects: () => ({
    playerEffect: ref(''),
    enemyEffect: ref(''),
    playerVariant: ref('normal'),
    enemyVariant: ref('normal'),
    showEffect,
  }),
}))

describe('battle toast visibility', () => {
  it('triggers on normal attacks but not on click attacks', () => {
    setActivePinia(createPinia())
    const dex = useShlagedexStore()
    const battle = useBattleStore()
    const player = dex.createShlagemon(carapouffe)
    const enemy = dex.createShlagemon(carapouffe)
    dex.setActiveShlagemon(player)

    // Prevent the interval loop from running automatically
    vi.spyOn(battle, 'startLoop').mockImplementation(() => {})

    const core = useBattleCore({ createEnemy: () => enemy })
    core.startBattle()

    // Manual click attack should not emit toasts
    showEffect.mockClear()
    core.attack()
    expect(showEffect).not.toHaveBeenCalled()

    // Normal tick attack should emit a toast
    showEffect.mockClear()
    vi.spyOn(battle, 'duel').mockReturnValue({
      player: { damage: 1, effect: 'super', crit: 'normal' },
      enemy: null,
    })
    core.tick()
    expect(showEffect).toHaveBeenCalledTimes(1)
  })
})
