import type { ShlagemonEvolution } from './shlagemonEvolution'
import type { ShlagemonType } from './shlagemonType'
import type { Stats } from './stats'

export type Sex = 'male' | 'female'

export interface BaseShlagemon {
  id: string
  name: string
  description: string
  /**
   * Primary and optional secondary type of the Shlagémon.
   * The first element represents the main type.
   */
  types: ShlagemonType[]
  evolution?: ShlagemonEvolution
  coefficient: number
}

export interface DexShlagemon extends Stats {
  id: string
  base: BaseShlagemon
  /**
   * Current coefficient used to compute battle stats.
   * The original coefficient from the base definition
   * remains unchanged in `base.coefficient`.
   */
  coefficient: number
  baseStats: Stats
  /**
   * ISO string representing the first time this Shlagémon was obtained.
   */
  captureDate: string
  /**
   * Number of times this Shlagémon has been captured or created via evolution.
   */
  captureCount: number
  lvl: number
  xp: number
  rarity: number
  sex: Sex
  isShiny: boolean
  hpCurrent: number
  /**
   * When true, this Shlagémon will evolve automatically without asking.
   */
  allowEvolution: boolean
  /**
   * ID of the item currently held by the Shlagémon, if any.
   */
  heldItemId?: string | null
}
