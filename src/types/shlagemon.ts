export interface ShlagemonType {
  id: string
  name: string
  description: string
  color: string
  resistance: ShlagemonType[]
  weakness: ShlagemonType[]
  tags: string[]
  passiveEffects: string[]
}

export interface BaseShlagemon {
  id: string
  name: string
  color: string
  description: string
  type: ShlagemonType
}

export interface DexShlagemon {
  base: BaseShlagemon
  lvl: number
  xp: number
  rarity: number
  hp: number
  attack: number
  defense: number
  smelling: number
}
