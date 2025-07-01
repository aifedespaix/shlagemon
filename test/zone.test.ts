import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import ZonePanel from '../src/components/panels/ZonePanel.vue'
import { carapouffe } from '../src/data/shlagemons'
import { useShlagedexStore } from '../src/stores/shlagedex'
import { useZoneStore } from '../src/stores/zone'
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
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('filters zones by level', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(carapouffe)
    const wrapper = mount(ZonePanel, {
      global: { plugins: [pinia] },
    })
    expect(wrapper.text()).not.toContain('Grotte du Slip')
    for (let i = 0; i < 9; i++)
      dex.gainXp(mon, xpForLevel(mon.lvl))
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Grotte du Slip')
  })
})
