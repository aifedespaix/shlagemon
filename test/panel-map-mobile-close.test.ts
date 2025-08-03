/* eslint-disable import/first */
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { useInterfaceStore } from '../src/stores/interface'
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
  it('closes zones panel on mobile after selecting a village when villages are shown on map', async () => {
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
    const interfaceStore = useInterfaceStore()
    interfaceStore.setShowVillagesOnMap(true)
    mobileTab.set('zones')

    const firstVillage = zone.zones.find(z => z.type === 'village')!
    zone.setZone(firstVillage.id)
    await nextTick()

    expect(mobileTab.current).toBe('game')

    wrapper.unmount()
    window.matchMedia = originalMatchMedia
  })

  it('keeps zones panel open on mobile after selecting a wild zone', async () => {
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
    const interfaceStore = useInterfaceStore()
    interfaceStore.setShowVillagesOnMap(true)
    mobileTab.set('zones')

    const wildZone = zone.zones.find(z => z.type === 'sauvage' && z.id !== zone.currentZoneId)!
    zone.setZone(wildZone.id)
    await nextTick()

    expect(mobileTab.current).toBe('zones')

    wrapper.unmount()
    window.matchMedia = originalMatchMedia
  })
})
