import type { Item } from './item'

export interface Ball extends Item {
  catchBonus: number
  animation: string
  quantity?: number
}
