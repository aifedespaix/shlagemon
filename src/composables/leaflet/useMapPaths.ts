import type { LatLngExpression, Map as LeafletMap } from 'leaflet'
import type { Position, Zone } from '~/type'
import { Polyline } from 'leaflet'

export function buildZigzagPath(zones: Zone[]): LatLngExpression[] {
  const path: LatLngExpression[] = []
  let alternate = true

  for (let i = 0; i < zones.length - 1; i++) {
    const from = zones[i].position
    const to = zones[i + 1].position

    if (i === 0)
      path.push([from.lat, from.lng])

    if (alternate) {
      path.push([to.lat, from.lng])
      path.push([to.lat, to.lng])
    }
    else {
      path.push([from.lat, to.lng])
      path.push([to.lat, to.lng])
    }

    alternate = !alternate
  }

  return path
}

export function buildSimplePath(
  from: Position,
  to: Position,
  first: 'vertical' | 'horizontal' = 'vertical',
): LatLngExpression[] {
  if (first === 'vertical') {
    return [
      [from.lat, from.lng],
      [to.lat, from.lng],
      [to.lat, to.lng],
    ]
  }
  return [
    [from.lat, from.lng],
    [from.lat, to.lng],
    [to.lat, to.lng],
  ]
}

export function useMapPaths(map: LeafletMap) {
  function drawPolylineWithBorder(
    path: LatLngExpression[],
    color = '#ffaa00',
    weight = 14,
  ) {
    const border = new Polyline(path, {
      color: '#000000',
      weight: weight + 4,
      opacity: 1,
      smoothFactor: 4,
    }).addTo(map)

    const line = new Polyline(path, {
      color,
      weight,
      opacity: 1,
      smoothFactor: 4,
    }).addTo(map)

    return [border, line]
  }

  return { drawPolylineWithBorder }
}
