import type { ShlagemonEvolution } from './shlagemonEvolution'
import type { ShlagemonType } from './shlagemonType'
import type { Stats } from './stats'

export type Sex = 'male' | 'female'

export interface BaseShlagemon {
  id: string
  name: string
  color: string
  description: string
  type: ShlagemonType
  evolution?: ShlagemonEvolution[]
  coefficient: number
}

export interface DexShlagemon extends Stats {
  id: string
  base: BaseShlagemon
  lvl: number
  xp: number
  rarity: number
  sex: Sex
  isShiny: boolean
  hpCurrent: number
}
