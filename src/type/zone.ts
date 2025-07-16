import type { Arena } from './arena'
import type { Item } from './item'
import type { BaseShlagemon } from './shlagemon'

export type ZoneType = 'village' | 'grotte' | 'sauvage'

export interface ZoneAction {
  id: string
  label: string
}

interface BaseZone {
  id: ZoneId
  name: string
  type: ZoneType
  actions: ZoneAction[]
  minLevel: number
  shlagemons?: BaseShlagemon[]
  image?: string
  hasKing?: boolean
  completionAchievement?: string
  arena?: {
    arena: Arena
    completed: boolean
  }
  village?: {
    shop?: {
      items: Item[]
    }
  }
}

// Variante spécifique pour les zones sauvages
export interface SavageZone extends BaseZone {
  type: 'sauvage'
  maxLevel: number // requis
}

// Variante générique pour toutes les autres zones
interface NonSavageZone extends BaseZone {
  type: Exclude<ZoneType, 'sauvage'>
  maxLevel?: undefined // interdit explicitement (ou facultatif si tu préfères)
}

// Union finale
export type Zone = SavageZone | NonSavageZone

export type ZoneId = SavageZoneId | VillageZoneId

export type VillageZoneId = 'village-paume' | 'village-caca-boudin' | 'village-veaux-du-gland' | 'village-boule' | 'village-cassos-land' | 'village-clitoland'

export type SavageZoneId = 'plaine-kekette' | 'bois-de-bouffon' | 'chemin-du-slip' | 'ravin-fesse-molle' | 'precipice-nanard' | 'marais-moudugenou' | 'forteresse-petmoalfiak' | 'route-du-nawak' | 'mont-dracatombe' | 'catacombes-merdifientes' | 'route-aguicheuse' | 'vallee-des-chieurs' | 'trou-du-bide' | 'zone-giga-zob' | 'route-so-dom'
