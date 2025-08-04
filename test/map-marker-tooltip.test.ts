import type { LeafletMap } from 'leaflet'
import type { Zone } from '../src/type'
import { describe, expect, it, vi } from 'vitest'
import { useLeafletMarker } from '../src/composables/leaflet/useLeafletMarker'
import { useMapMarkers } from '../src/composables/leaflet/useMapMarkers'

vi.mock('../src/composables/leaflet/useLeafletMarker', () => ({
  useLeafletMarker: vi.fn(() => ({
    on: vi.fn(),
    off: vi.fn(),
    setIcon: vi.fn(),
    getElement: vi.fn(() => document.createElement('div')),
  })),
}))

vi.mock('../src/composables/useZoneCompletion', () => ({
  useZoneCompletion: () => ({
    allCaptured: { value: false },
    perfectZone: { value: false },
    kingDefeated: { value: false },
    arenaCompleted: { value: false },
  }),
}))

vi.mock('../src/stores/zoneVisit', () => ({
  useZoneVisitStore: () => ({ visited: {} }),
}))

describe('useMapMarkers', () => {
  it('assigns zone name as marker title', () => {
    const dummyMap = {} as LeafletMap
    const { addMarker } = useMapMarkers(dummyMap)
    const zone: Zone = {
      id: 'test-zone',
      name: 'Test Zone',
      type: 'sauvage',
      position: { lat: 0, lng: 0 },
      minLevel: 1,
      maxLevel: 2,
    }
    addMarker(zone)
    expect(useLeafletMarker).toHaveBeenCalledWith(
      expect.objectContaining({ title: zone.name }),
    )
  })
})
