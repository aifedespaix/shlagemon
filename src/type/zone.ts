import type { Arena } from './arena'
import type { Item } from './item'
import type { MiniGameId } from './minigame'
import type { BaseShlagemon } from './shlagemon'

export const ZONE_TYPES = ['village', 'sauvage'] as const
export type ZoneType = typeof ZONE_TYPES[number]

export const VILLAGE_TYPES = ['basic', 'super', 'hyper'] as const
export type VillageType = typeof VILLAGE_TYPES[number]

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
  readonly type: 'shop' | 'arena' | 'minigame' | 'poulailler' | string
  readonly label: string
  readonly position: Position
  /** Items available in the shop when the POI type is `shop`. */
  readonly items?: Item[]
  /** Identifier of the mini-game associated with the POI. */
  readonly miniGame?: MiniGameId
  /** Arena data when the POI type is `arena`. */
  readonly arena?: ZoneArena
}

export type POIsById = Record<string, VillagePOI>
export type POIsByType = Record<string, VillagePOI[]>

/**
 * Base properties shared by every zone.
 */
interface BaseZoneCommon {
  readonly id: ZoneId
  readonly position: Position
  readonly name: string
  readonly type: ZoneType
  readonly minLevel: number
  readonly shlagemons?: BaseShlagemon[]
  readonly completionAchievement?: string
}

/** Zone configuration for savage areas. */
export interface SavageZone extends BaseZoneCommon {
  readonly type: 'sauvage'
  readonly maxLevel: number
  readonly hasKing?: boolean
}

/** Zone configuration for villages. */
export interface VillageZone extends BaseZoneCommon {
  readonly type: 'village'
  readonly villageType: VillageType
  readonly map: ZoneMap
  /** Points of interest indexed by their identifier. */
  readonly pois: POIsById
  /** Attached savage zone identifier, when applicable. */
  readonly attachedTo?: SavageZoneId
}

export interface ZoneMap {
  /** Center of the map, used to initialize the viewport. */
  readonly center: Position
  /** Minimum latitude/longitude accessible on the map. */
  readonly min: Position
  /** Maximum latitude/longitude accessible on the map. */
  readonly max: Position
}

/** Union of all zone variants. */
export type Zone = SavageZone | VillageZone

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
