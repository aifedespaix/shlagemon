import type { LatLngExpression, Map as LeafletMap } from 'leaflet'
import { DivIcon, Icon, Marker } from 'leaflet'

export function useLeafletMarker(options: {
  map: LeafletMap
  position: LatLngExpression
  iconUrl?: string
  html?: string
  size?: number
  anchorY?: number
  className?: string
  interactive?: boolean
  title?: string
}): Marker {
  const { map, position, iconUrl, html, className } = options
  const size = options.size || 48
  const anchorY = options.anchorY ?? size
  const icon = iconUrl
    ? new Icon({
      iconUrl,
      iconSize: [size, size],
      iconAnchor: [Math.round(size / 2), anchorY],
      className,
    })
    : html
      ? new DivIcon({
        html,
        className,
        iconSize: [size, size],
        iconAnchor: [Math.round(size / 2), anchorY],
      })
      : undefined
  const marker = new Marker(position, {
    interactive: options.interactive ?? true,
    icon,
    title: options.title,
  })

  marker.addTo(map)
  return marker
}
