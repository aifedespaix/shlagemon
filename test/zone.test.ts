import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import ZonePanel from '../src/components/panels/ZonePanel.vue'
import { carapouffe } from '../src/data/shlagemons'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { useZoneStore } from '../src/stores/zone'
import { useZoneProgressStore } from '../src/stores/zoneProgress'
import { xpForLevel } from '../src/utils/dexFactory'

describe('zone store', () => {
  it('changes current zone', () => {
    setActivePinia(createPinia())
    const store = useZoneStore()
    expect(store.current.id).toBe(store.zones[0].id)
    store.setZone('grotte-du-slip')
    expect(store.current.id).toBe('grotte-du-slip')
  })
})

describe('zone panel', () => {
  it('renders actions', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const wrapper = mount(ZonePanel, {
      global: { plugins: [pinia] },
    })
    expect(wrapper.text()).toContain('Entrer le Shop')
  })

  it('filters zones by level', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    const progress = useZoneProgressStore()
    const mon = dex.createShlagemon(carapouffe)
    const wrapper = mount(ZonePanel, {
      global: { plugins: [pinia] },
    })
    let btn = wrapper.findAll('button').find(b => b.text().includes('Grotte du Slip'))
    expect(btn?.attributes('disabled')).toBeDefined()
    for (let i = 0; i < 20; i++)
      progress.addWin('plaine-kekette')
    for (let i = 0; i < 20; i++)
      progress.addWin('bois-de-bouffon')
    progress.defeatKing('plaine-kekette')
    progress.defeatKing('bois-de-bouffon')
    for (let i = 0; i < 9; i++)
      dex.gainXp(mon, xpForLevel(mon.lvl))
    await wrapper.vm.$nextTick()
    btn = wrapper.findAll('button').find(b => b.text().includes('Grotte du Slip'))
    expect(btn?.attributes('disabled')).toBeUndefined()
  })

  it('shows king button after 20 wins', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const progress = useZoneProgressStore()
    const zone = useZoneStore()
    const wrapper = mount(ZonePanel, { global: { plugins: [pinia] } })
    zone.setZone('plaine-kekette')
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).not.toContain('Vaincre le roi')
    for (let i = 0; i < 20; i++)
      progress.addWin('plaine-kekette')
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Vaincre le roi')
  })
})
