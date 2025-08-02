import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import ZoneActions from '../src/components/village/ZoneActions.vue'
import { useArenaStore } from '../src/stores/arena'
import { usePlayerStore } from '../src/stores/player'
import { useZoneStore } from '../src/stores/zone'

describe('arena access requires previous badge', () => {
  it('prevents opening arena without required badge', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const zone = useZoneStore()
    const arena = useArenaStore()
    const player = usePlayerStore()
    zone.setZone('village-paume')
    const wrapper = mount(ZoneActions, { global: { plugins: [pinia] } })
    wrapper.vm.openArena()
    expect(arena.arenaData).toBeNull()
    player.earnBadge('arena20')
    wrapper.vm.openArena()
    expect(arena.arenaData?.id).toBe('arena40')
  })
})
