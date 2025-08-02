import type { Map as LeafletMap, Marker } from 'leaflet'
import type { VillagePOI } from '~/type'
import { onUnmounted } from 'vue'
import { useLeafletMarker } from './useLeafletMarker'

/**
 * Manage a collection of Leaflet markers representing village points of interest.
 */
export function usePoiMarkers(map: LeafletMap) {
  const markers = new Map<string, Marker>()

  function clear() {
    markers.forEach(m => m.remove())
    markers.clear()
  }

  function add(poi: VillagePOI, html: string, onSelect?: (poi: VillagePOI) => void) {
    const marker = useLeafletMarker({
      map,
      position: [poi.position.lat, poi.position.lng],
      html,
      size: 96,
      anchorY: 96,
      interactive: true,
      title: poi.label,
    })
    if (onSelect)
      marker.on('click', () => onSelect(poi))
    markers.set(poi.id, marker)
    return marker
  }

  function highlight(id?: string) {
    markers.forEach((marker, key) => {
      const el = marker.getElement() as HTMLElement | null
      if (!el)
        return
      if (key === id) {
        el.style.filter = `
          drop-shadow(0 0 0px #3b82f6)
          drop-shadow(0 0 6px #3b82f6)
          drop-shadow(0 0 16px #3b82f6)
        `
      }
      else {
        el.style.filter = ''
      }
    })
  }

  onUnmounted(clear)

  return { add, clear, highlight }
}
