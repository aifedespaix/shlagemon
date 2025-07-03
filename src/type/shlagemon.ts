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
  baseStats: Stats
  lvl: number
  xp: number
  rarity: number
  sex: Sex
  isShiny: boolean
  hpCurrent: number
}
