import type { SavageZone } from '../src/type/zone'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import BattleHeader from '../src/components/battle/Header.vue'
import ZoneButtonWild from '../src/components/zone/ButtonWild.vue'
import { useZoneInfoStore } from '../src/stores/zoneInfo'

function setupPinia() {
  const pinia = createPinia()
  setActivePinia(pinia)
  return pinia
}

describe('zone info visibility flags', () => {
  it('hides zone name and levels when not unlocked', () => {
    const pinia = setupPinia()
    const info = useZoneInfoStore()
    info.hasMultipleZones = false
    info.showZoneLevels = false

    const wrapper = mount(BattleHeader, {
      props: { zoneName: 'Test Zone' },
      global: { plugins: [pinia] },
    })

    expect(wrapper.text()).not.toContain('Test Zone')
    expect(wrapper.text()).not.toMatch(/\d+ - \d+/)
  })

  it('shows zone name and levels when unlocked', () => {
    const pinia = setupPinia()
    const info = useZoneInfoStore()
    info.hasMultipleZones = true
    info.showZoneLevels = true

    const wrapper = mount(BattleHeader, {
      props: { zoneName: 'Test Zone' },
      global: { plugins: [pinia] },
    })

    expect(wrapper.text()).toContain('Test Zone')
    expect(wrapper.text()).toContain('1 - 5')
  })

  it('renders zone levels on buttons only when unlocked', () => {
    const pinia = setupPinia()
    const info = useZoneInfoStore()
    info.showZoneLevels = false

    const zone: SavageZone = {
      id: 'plaine-kekette',
      name: 'zone.test',
      type: 'sauvage',
      position: { lat: 0, lng: 0 },
      minLevel: 1,
      maxLevel: 5,
      shlagemons: [],
    }

    const wrapper = mount(ZoneButtonWild, {
      props: { zone },
      global: { plugins: [pinia], directives: { tooltip: () => {} } },
    })

    expect(wrapper.text()).not.toContain('1')
    expect(wrapper.text()).not.toContain('5')

    info.showZoneLevels = true
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.text()).toContain('1')
      expect(wrapper.text()).toContain('5')
    })
  })
})
