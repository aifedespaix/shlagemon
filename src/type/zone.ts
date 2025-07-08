import type { Arena } from './arena'
import type { BaseShlagemon } from './shlagemon'

export type ZoneType = 'village' | 'grotte' | 'sauvage'

export interface ZoneAction {
  id: string
  label: string
}

export interface Zone {
  id: ZoneId
  name: string
  type: ZoneType
  actions: ZoneAction[]
  /** Minimum level for enemies and XP gain */
  minLevel: number
  /** Maximum level for enemies and XP gain */
  maxLevel: number
  shlagemons?: BaseShlagemon[]
  image?: string
  /** Whether this zone features a king to challenge */
  hasKing?: boolean
  /** Achievement title when all Shlagemon are captured */
  completionAchievement?: string
  /** Optional arena available in this zone */
  arena?: {
    arena: Arena
    completed: boolean
  }
}

export type ZoneId = SavageZoneId | VillageZoneId

export type VillageZoneId = 'village-paume' | 'village-caca-boudin' | 'village-veaux-du-gland' | 'village-boule'

export type SavageZoneId = 'plaine-kekette' | 'bois-de-bouffon' | 'chemin-du-slip' | 'ravin-fesse-molle' | 'precipice-nanard' | 'marais-moudugenou' | 'forteresse-petmoalfiak' | 'route-du-nawak' | 'mont-dracatombe' | 'catacombes-merdifientes' | 'route-aguicheuse' | 'vallee-des-chieurs' | 'trou-du-bide' | 'zone-giga-zob' | 'route-so-dom'
