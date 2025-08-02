import type { Component } from 'vue'
import type { Arena } from './arena'
import type { Item } from './item'
import type { MiniGameId } from './minigame'
import type { BaseShlagemon } from './shlagemon'

export type ZoneType = 'village' | 'grotte' | 'sauvage'

export type VillageType = 'basic' | 'super' | 'hyper'

export interface ZoneAction {
  id: string
  label: string
}

export type ArenaFactory = () => Arena

export interface ZoneArena {
  readonly arena: Arena | ArenaFactory
  completed: boolean
}

export interface Position {
  lat: number
  lng: number
}

export interface VillagePOI {
  readonly id: string
  readonly type: 'shop' | 'arena' | 'minigame' | string
  readonly label: string
  readonly position: Position
  /**
   * Icon representing the point of interest.
   * May be an UnoCSS icon class or an image URL.
   */
  readonly icon: string | Component
  /** Optional reference to domain data (shop, arena, etc.). */
  readonly data?: unknown
}

interface BaseZone {
  id: ZoneId
  position: Position
  name: string
  type: ZoneType
  actions: ZoneAction[]
  minLevel: number
  shlagemons?: BaseShlagemon[]
  image?: string
  hasKing?: boolean
  completionAchievement?: string
  arena?: ZoneArena
  miniGame?: MiniGameId
  village?: {
    shop?: {
      items: Item[]
    }
    poulailler?: {
      icon: string
    }
  }
}

// Variante spécifique pour les zones sauvages
export interface SavageZone extends BaseZone {
  type: 'sauvage'
  maxLevel: number // requis
}

// Variante générique pour toutes les autres zones
interface BaseNonSavageZone extends BaseZone {
  type: Exclude<ZoneType, 'sauvage'>
  maxLevel?: undefined // interdit explicitement (ou facultatif si tu préfères)
  /** Zone sauvage à laquelle cette zone est reliée */
  attachedTo?: SavageZoneId
}

export interface VillageZone extends BaseNonSavageZone {
  type: 'village'
  villageType: VillageType
  /** Points of interest displayed on the village map. */
  readonly pois: readonly VillagePOI[]
  /** Optional center used when initialising the Leaflet map for this village. */
  readonly mapCenter?: Position
}

interface NonVillageZone extends BaseNonSavageZone {
  type: Exclude<ZoneType, 'sauvage' | 'village'>
}

type NonSavageZone = VillageZone | NonVillageZone

// Union finale
export type Zone = SavageZone | NonSavageZone

export type ZoneId = SavageZoneId | VillageZoneId

export type VillageZoneId = 'village-paume' | 'village-caca-boudin' | 'village-veaux-du-gland' | 'village-boule' | 'village-cassos-land' | 'village-clitoland' | 'village-giga-schlag'

export type SavageZoneId
= | 'plaine-kekette'
  | 'bois-de-bouffon'
  | 'chemin-du-slip'
  | 'ravin-fesse-molle'
  | 'precipice-nanard'
  | 'marais-moudugenou'
  | 'forteresse-petmoalfiak'
  | 'route-du-nawak'
  | 'mont-dracatombe'
  | 'catacombes-merdifientes'
  | 'route-aguicheuse'
  | 'vallee-des-chieurs'
  | 'trou-du-bide'
  | 'lac-aux-relous'
  | 'zone-giga-zob'
  | 'route-so-dom'
  | 'mont-kouillasse'
  | 'paturage-crado'
  | 'canyon-a-la-derp'
  | 'cratere-des-legends'
