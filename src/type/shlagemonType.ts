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
