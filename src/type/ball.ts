import type { Item } from './item'

/**
 * A capture device item used to catch Shlagémon.
 * Combines base item properties with capture-specific attributes.
 */
export type Ball = Item & {
  /** Bonus applied to the capture probability. */
  catchBonus: number
  /** Image or animation displayed when the ball is thrown. */
  animation: string
  /** Number of remaining balls of this type in the player's inventory. */
  quantity?: number
}
