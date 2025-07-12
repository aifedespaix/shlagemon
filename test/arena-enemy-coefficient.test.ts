import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import ArenaPanel from '../src/components/arena/ArenaPanel.vue'
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
    const mon = dex.createShlagemon(carapouffe)
    for (let i = 0; i < arena.selections.length; i++)
      arena.selectPlayer(i, mon.id)

    const wrapper = mount(ArenaPanel, {
      global: {
        plugins: [pinia],
        stubs: ['ArenaBattleHeader', 'ArenaDuel', 'ArenaEnemyStats', 'Modal', 'ShlagemonImage', 'ShlagemonQuickSelect', 'Button', 'Info'],
      },
    })

    wrapper.vm.startBattle()

    const enemy = arena.enemyTeam[0]
    expect(enemy.base.coefficient).toBe(arena20.level)
    wrapper.unmount()
  })
})
