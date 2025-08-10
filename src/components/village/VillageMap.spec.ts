import type { VillagePOI, VillageZone, VillageZoneId } from '~/type'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import VillageMap from './Map.vue'

const baseVillage: VillageZone = {
  id: 'village-paume' as VillageZoneId,
  name: 'Test',
  type: 'village',
  villageType: 'basic',
  position: { lat: 0, lng: 0 },
  map: {
    center: { lat: 0, lng: 0 },
    min: { lat: -10, lng: -10 },
    max: { lat: 10, lng: 10 },
  },
  minLevel: 1,
  pois: {
    shop: {
      id: 'shop',
      type: 'shop',
      label: 'Shop',
      position: { lat: 0, lng: 0 },
      items: [],
    },
  },
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
    const events = wrapper.emitted('select') as Array<[VillagePOI]> | undefined
    expect(events).toBeTruthy()
    expect(events![0][0].id).toBe('shop')
  })

  it('updates markers when village changes', async () => {
    const wrapper = mount(VillageMap, { props: { village: baseVillage } })
    const newVillage: VillageZone = { ...baseVillage, id: 'village-boule' as VillageZoneId, pois: {} }
    await wrapper.setProps({ village: newVillage } as Partial<InstanceType<typeof VillageMap>['$props']>)
    const markers = wrapper.element.querySelectorAll('.leaflet-marker-icon')
    expect(markers.length).toBe(0)
  })
})
