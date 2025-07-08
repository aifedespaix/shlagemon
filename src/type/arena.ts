import type { Character } from './character'
import type { BaseShlagemon } from './shlagemon'

export interface ArenaBadge {
  id: string
  name: string
  levelCap: number
  image?: string
}

export interface Arena {
  id: string
  badge: ArenaBadge
  character: Character
  lineup: BaseShlagemon[]
  level: number
}
