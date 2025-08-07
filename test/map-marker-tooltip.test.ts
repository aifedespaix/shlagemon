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
  })

  it('assigns zone name as marker title', () => {
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
    expect(useLeafletMarker).toHaveBeenCalledWith(
      expect.objectContaining({ title: i18n.global.t(zone.name) }),
    )
  })

  it('renders shiny star when all mons are shiny', () => {
    useZoneCompletionMock.mockReturnValue({
      allCaptured: ref(true),
      perfectZone: ref(false),
      allShiny: ref(true),
      kingDefeated: ref(false),
      arenaCompleted: ref(false),
    })
    const dummyMap = {} as LeafletMap
    const { addMarker } = useMapMarkers(dummyMap)
    addMarker(zone)
    const html = useLeafletMarkerMock.mock.calls[0][0].html as string
    expect(html).toContain('mask-rainbow')
  })

  it('adds golden aura to ball when zone is perfect', () => {
    useZoneCompletionMock.mockReturnValue({
      allCaptured: ref(true),
      perfectZone: ref(true),
      allShiny: ref(false),
      kingDefeated: ref(false),
      arenaCompleted: ref(false),
    })
    const dummyMap = {} as LeafletMap
    const { addMarker } = useMapMarkers(dummyMap)
    addMarker(zone)
    const html = useLeafletMarkerMock.mock.calls[0][0].html as string
    expect(html).toContain('drop-shadow(0 0 2px #facc15)')
  })
})
