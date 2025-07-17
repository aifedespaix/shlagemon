import type { Character } from './character'
import type { BaseShlagemon } from './shlagemon'

export interface ArenaBadge {
  id: string
  name: string
  levelCap: number
  image?: string
}

export type LineupFactory = () => BaseShlagemon[]

export interface Arena {
  id: string
  badge: ArenaBadge
  character: Character
  readonly lineup: BaseShlagemon[] | LineupFactory
  level: number
}
