export type ZoneType = 'village' | 'grotte' | 'sauvage'

export interface ZoneAction {
  id: string
  label: string
}

export interface Zone {
  id: string
  name: string
  type: ZoneType
  actions: ZoneAction[]
  /** Minimum level for enemies and XP gain */
  minLevel: number
  /** Maximum level for enemies and XP gain */
  maxLevel: number
}
