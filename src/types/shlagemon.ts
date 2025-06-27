export interface ShlagemonType {
  id: string
  name: string
  description: string
  color: string
}

export interface BaseShlagemon {
  id: string
  name: string
  color: string
  description: string
  type: ShlagemonType
}

export interface DexShlagemon extends BaseShlagemon {
  lvl: number
  rarity: number
  hp: number
  attack: number
  defense: number
  smelling: number
}
