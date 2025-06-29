export interface ShlagemonType {
  id: string
  name: string
  description: string
  color: string
  resistance: string[]
  weakness: string[]
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
  /**
   * Unique identifier for each captured Shlagémon
   */
  id: string
  base: BaseShlagemon
  lvl: number
  xp: number
  rarity: number
  hp: number
  attack: number
  defense: number
  smelling: number
}
