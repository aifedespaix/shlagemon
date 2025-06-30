import type { BaseShlagemon } from './shlagemon'

export type ShlagemonEvolutionConditionType = 'lvl' | 'item'

export interface ShlagemonEvolutionConditionLevel {
  type: 'lvl'
  value: number
}
export interface ShlagemonEvolutionConditionItem {
  type: 'item'
  value: string
}

export type ShlagemonEvolutionCondition = ShlagemonEvolutionConditionLevel | ShlagemonEvolutionConditionItem

export interface ShlagemonEvolution {
  base: BaseShlagemon
  condition: ShlagemonEvolutionCondition
}
