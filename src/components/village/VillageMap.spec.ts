import type { VillageZone } from '~/type'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import VillageMap from './VillageMap.vue'

const baseVillage: VillageZone = {
  id: 'test-village',
  name: 'Test',
  type: 'village',
  villageType: 'basic',
  position: { lat: 0, lng: 0 },
  mapCenter: { lat: 0, lng: 0 },
  actions: [],
  minLevel: 1,
  pois: [
    {
      id: 'shop',
      type: 'shop',
      label: 'Shop',
      position: { lat: 0, lng: 0 },
      icon: 'i-carbon-shop',
    },
  ],
}

describe('village map', () => {
  it('mounts and displays markers', () => {
    const wrapper = mount(VillageMap, { props: { village: baseVillage } })
    const markers = wrapper.element.querySelectorAll('.leaflet-marker-icon')
    expect(markers.length).toBe(1)
  })

  it('emits select on marker click', async () => {
    const wrapper = mount(VillageMap, { props: { village: baseVillage } })
    const marker = wrapper.element.querySelector('.leaflet-marker-icon') as HTMLElement
    marker.dispatchEvent(new Event('click'))
    const events = wrapper.emitted('select')
    expect(events).toBeTruthy()
    expect(events![0][0].id).toBe('shop')
  })

  it('updates markers when village changes', async () => {
    const wrapper = mount(VillageMap, { props: { village: baseVillage } })
    const newVillage: VillageZone = { ...baseVillage, id: 'v2', pois: [] }
    await wrapper.setProps({ village: newVillage })
    const markers = wrapper.element.querySelectorAll('.leaflet-marker-icon')
    expect(markers.length).toBe(0)
  })
})
