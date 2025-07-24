import type { LatLngExpression, Map as LeafletMap } from 'leaflet'
import type { Zone, ZoneId } from '~/type'
import { useLeafletMarker } from './useLeafletMarker'

export function useMapMarkers(map: LeafletMap) {
  function iconPath(id: ZoneId): string {
    return `/map/icons/${id}.webp`
  }

  function addMarker(zone: Zone, onSelect?: (id: ZoneId) => void, inactive = false) {
    const marker = useLeafletMarker({
      map,
      position: [zone.position.lat, zone.position.lng] as LatLngExpression,
      iconUrl: iconPath(zone.id),
      size: 48,
      className: inactive ? 'grayscale opacity-50' : undefined,
      interactive: !inactive,
    })
    if (onSelect && !inactive)
      marker.on('click', () => onSelect(zone.id))
    return marker
  }

  return { addMarker }
}
