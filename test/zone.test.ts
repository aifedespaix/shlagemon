import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import ZonePanel from '../src/components/panels/ZonePanel.vue'
import { useZoneStore } from '../src/stores/zone'

describe('zone store', () => {
  it('changes current zone', () => {
    setActivePinia(createPinia())
    const store = useZoneStore()
    expect(store.current.id).toBe(store.zones[0].id)
    store.setZone('grotte')
    expect(store.current.id).toBe('grotte')
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
})
