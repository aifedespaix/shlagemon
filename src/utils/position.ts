import type { Position } from '~/type'

export const move = {
  bottom: (position: Position, value: number): Position => ({
    lat: position.lat - value,
    lng: position.lng,
  }),
  top: (position: Position, value: number): Position => ({
    lat: position.lat + value,
    lng: position.lng,
  }),
  left: (position: Position, value: number): Position => ({
    lat: position.lat,
    lng: position.lng - value,
  }),
  right: (position: Position, value: number): Position => ({
    lat: position.lat,
    lng: position.lng + value,
  }),
}
