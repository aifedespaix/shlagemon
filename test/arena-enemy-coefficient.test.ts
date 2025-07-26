import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import ArenaPanel from '../src/components/arena/Panel.vue'
import { arena20 } from '../src/data/arenas'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { useArenaStore } from '../src/stores/arena'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('arena enemies', () => {
  it('match coefficient with arena level', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const arena = useArenaStore()
    const dex = useShlagedexStore()
    arena.setArena(arena20)
    for (let i = 0; i < arena.selections.length; i++) {
      const mon = dex.createShlagemon(carapouffe)
      arena.selectPlayer(i, mon.id)
    }

    const wrapper = mount(ArenaPanel, {
      global: {
        plugins: [pinia],
        stubs: ['ArenaBattleHeader', 'ArenaDuel', 'ArenaEnemyStats', 'Modal', 'ShlagemonImage', 'ShlagemonQuickSelect', 'Button', 'Info'],
      },
    })

    wrapper.vm.startBattle()

    const enemy = arena.enemyTeam[0]
    const multiplier = Math.floor(arena20.level / 2) - 1
    expect(enemy.coefficient).toBe(enemy.base.coefficient * multiplier)
    wrapper.unmount()
  })
})
