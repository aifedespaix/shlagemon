import type { LeafletMap } from 'leaflet'
import type { Zone } from '../src/type'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { useLeafletMarker } from '../src/composables/leaflet/useLeafletMarker'
import { useMapMarkers } from '../src/composables/leaflet/useMapMarkers'
import { i18n } from '../src/modules/i18n'

const { useLeafletMarkerMock, useZoneCompletionMock } = vi.hoisted(() => ({
  useLeafletMarkerMock: vi.fn(() => ({
    on: vi.fn(),
    off: vi.fn(),
    setIcon: vi.fn(),
    getElement: vi.fn(() => document.createElement('div')),
  })),
  useZoneCompletionMock: vi.fn(),
}))

vi.mock('../src/composables/leaflet/useLeafletMarker', () => ({
  useLeafletMarker: useLeafletMarkerMock,
}))

vi.mock('../src/composables/useZoneCompletion', () => ({
  useZoneCompletion: useZoneCompletionMock,
}))

vi.mock('../src/stores/zoneVisit', () => ({
  useZoneVisitStore: () => ({ visited: {} }),
}))

describe('useMapMarkers', () => {
  const zone: Zone = {
    id: 'test-zone',
    name: 'test.zone.name',
    type: 'sauvage',
    position: { lat: 0, lng: 0 },
    minLevel: 1,
    maxLevel: 2,
  }

  beforeEach(() => {
    useLeafletMarkerMock.mockClear()
    useZoneCompletionMock.mockReset()
  })

  it('assigns zone name as marker title', () => {
    useZoneCompletionMock.mockReturnValue({
      allCaptured: ref(true),
      perfectZone: ref(false),
      allShiny: ref(false),
      kingDefeated: ref(false),
      arenaCompleted: ref(false),
    })
    const dummyMap = {} as LeafletMap
    const { addMarker } = useMapMarkers(dummyMap)
    addMarker(zone)
    expect(useLeafletMarker).toHaveBeenCalledWith(
      expect.objectContaining({ title: i18n.global.t(zone.name) }),
    )
  })

  it('omits icon container for non-village zones', () => {
    useZoneCompletionMock.mockReturnValue({
      allCaptured: ref(true),
      perfectZone: ref(false),
      allShiny: ref(false),
      kingDefeated: ref(true),
      arenaCompleted: ref(false),
    })
    const dummyMap = {} as LeafletMap
    const { addMarker } = useMapMarkers(dummyMap)
    addMarker(zone)
    const html = useLeafletMarkerMock.mock.calls[0][0].html as string
    expect(html).not.toContain('bg-dark/75')
  })

  it('does not render grey arena icon when village lacks an arena', () => {
    useZoneCompletionMock.mockReturnValue({
      allCaptured: ref(true),
      perfectZone: ref(false),
      allShiny: ref(false),
      kingDefeated: ref(false),
      arenaCompleted: ref(false),
    })
    const dummyMap = {} as LeafletMap
    const { addMarker } = useMapMarkers(dummyMap)
    const village: Zone = {
      id: 'test-village',
      name: 'test.village.name',
      type: 'village',
      villageType: 'basic',
      position: { lat: 0, lng: 0 },
      minLevel: 1,
      pois: {},
    }
    addMarker(village)
    const html = useLeafletMarkerMock.mock.calls[0][0].html as string
    expect(html).not.toContain('i-mdi:sword-cross')
  })

  it('applies grayscale style when zone not fully captured', () => {
    useZoneCompletionMock.mockReturnValue({
      allCaptured: ref(false),
      perfectZone: ref(false),
      allShiny: ref(false),
      kingDefeated: ref(false),
      arenaCompleted: ref(false),
    })
    const dummyMap = {} as LeafletMap
    const { addMarker } = useMapMarkers(dummyMap)
    addMarker(zone)
    const html = useLeafletMarkerMock.mock.calls[0][0].html as string
    expect(html).toContain('grayscale(1)')
  })

  it('adds shiny star and perfect zone effects when applicable', () => {
    useZoneCompletionMock.mockReturnValue({
      allCaptured: ref(true),
      perfectZone: ref(true),
      allShiny: ref(true),
      kingDefeated: ref(false),
      arenaCompleted: ref(false),
    })
    const dummyMap = {} as LeafletMap
    const { addMarker } = useMapMarkers(dummyMap)
    addMarker(zone)
    const html = useLeafletMarkerMock.mock.calls[0][0].html as string
    expect(html).toContain('mask-rainbow')
    expect(html).toContain('drop-shadow(0 0 2px #facc15)')
  })
})
