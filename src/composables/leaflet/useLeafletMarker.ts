import type { LatLngExpression, Map as LeafletMap } from 'leaflet'
import { Icon, Marker } from 'leaflet'

export function useLeafletMarker(options: {
  map: LeafletMap
  position: LatLngExpression
  iconUrl?: string
  size?: number
}): Marker {
  const { map, position, iconUrl } = options
  const size = options.size || 48
  const marker = new Marker(position, {
    icon: iconUrl
      ? new Icon({
        iconUrl,
        iconSize: [size, size],
        iconAnchor: [Math.round(size / 2), size],
      })
      : undefined,
  })

  marker.addTo(map)
  return marker
}
