import type { Position } from '~/type'

export const move = {
  bottom: (position: Position, value: number): Position => ({
    lat: position.lat - value - 10,
    lng: position.lng,
  }),
  top: (position: Position, value: number): Position => ({
    lat: position.lat + value + 6,
    lng: position.lng,
  }),
  left: (position: Position, value: number): Position => ({
    lat: position.lat,
    lng: position.lng - value * 2,
  }),
  right: (position: Position, value: number): Position => ({
    lat: position.lat,
    lng: position.lng + value * 2,
  }),
}
