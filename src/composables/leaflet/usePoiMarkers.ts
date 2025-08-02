import type { Map as LeafletMap, Marker } from 'leaflet'
import type { VillagePOI } from '~/type'
import { onUnmounted } from 'vue'
import { useLeafletMarker } from './useLeafletMarker'

/**
 * Manage a collection of Leaflet markers representing village points of interest.
 */
export function usePoiMarkers(map: LeafletMap) {
  const markers: Marker[] = []

  function clear() {
    markers.forEach(m => m.remove())
    markers.length = 0
  }

  function add(poi: VillagePOI, html: string, onSelect?: (poi: VillagePOI) => void) {
    const marker = useLeafletMarker({
      map,
      position: [poi.position.lat, poi.position.lng],
      html,
      size: 48,
      anchorY: 48,
      interactive: true,
      title: poi.label,
    })
    if (onSelect)
      marker.on('click', () => onSelect(poi))
    markers.push(marker)
    return marker
  }

  onUnmounted(clear)

  return { add, clear }
}
