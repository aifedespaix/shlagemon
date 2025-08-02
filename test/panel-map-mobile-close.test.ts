/* eslint-disable import/first */
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { useMobileTabStore } from '../src/stores/mobileTab'
import { useZoneStore } from '../src/stores/zone'

vi.mock('../src/components/leaflet/map.vue', () => ({
  default: defineComponent({
    emits: ['select'],
    setup(_, { expose }) {
      function selectZone() {}
      expose({ selectZone })
      return () => h('div')
    },
  }),
}))

import PanelMap from '../src/components/panel/Map.vue'

describe('panel map mobile behaviour', () => {
  it('closes zones panel on mobile after selecting a village', async () => {
    const originalMatchMedia = window.matchMedia
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: true,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as any

    const wrapper = mount(PanelMap, {
      global: {
        stubs: {
          ZonePrevButton: true,
          ZoneNextButton: true,
          UiProgressBar: true,
        },
      },
    })

    const zone = useZoneStore()
    const mobileTab = useMobileTabStore()
    mobileTab.set('zones')

    zone.setZone(zone.zones[1].id)
    await nextTick()

    expect(mobileTab.current).toBe('game')

    wrapper.unmount()
    window.matchMedia = originalMatchMedia
  })
})
