import type { LatLngExpression, Map as LeafletMap } from 'leaflet'
import type { Zone, ZoneId } from '~/type'
import { useLeafletMarker } from './useLeafletMarker'

export function useMapMarkers(map: LeafletMap) {
  function iconPath(id: ZoneId): string {
    return `/map/icons/${id}.webp`
  }

  function addMarker(zone: Zone, onSelect?: (id: ZoneId) => void) {
    const marker = useLeafletMarker({
      map,
      position: [zone.position.lat, zone.position.lng] as LatLngExpression,
      iconUrl: iconPath(zone.id),
      size: 48,
    })
    if (onSelect)
      marker.on('click', () => onSelect(zone.id))
    return marker
  }

  return { addMarker }
}
