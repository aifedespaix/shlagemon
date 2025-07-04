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
}

export type ZoneId = FightZoneId | VillageZoneId

export type VillageZoneId = 'village-paume' | 'village-caca-boudin' | 'village-veaux-du-gland' | 'village-boule'

export type FightZoneId = 'chambre-du-noobi' | 'plaine-kekette' | 'bois-de-bouffon' | 'grotte-du-slip' | 'ravin-fesse-molle' | 'grotte-nanard' | 'marais-moudugenou' | 'forteresse-petmoalfiak' | 'route-du-nawak' | 'mont-dracatombe' | 'catacombes-merdifientes' | 'route-aguicheuse' | 'grotte-des-chieurs' | 'trou-du-bide' | 'zone-giga-zob' | 'route-so-dom'
