import type { I18nKey } from './i18n'
import type { ShlagemonEvolution } from './shlagemonEvolution'
import type { ShlagemonType } from './shlagemonType'
import type { Stats } from './stats'

export type Sex = 'male' | 'female'

export type Speciality
  = 'legendary'
    | 'unique'
    | 'evolution0'
    | 'evolution1'
    | 'evolution2'

export interface BaseShlagemon {
  id: string
  name: I18nKey
  description: I18nKey
  /**
   * Primary and optional secondary type of the Shlagémon.
   * The first element represents the main type.
   */
  types: ShlagemonType[]
  /** @deprecated Temporary legacy field */
  evolution?: ShlagemonEvolution
  /**
   * Possible evolutions for this Shlagémon.
   * Multiple options can be provided.
   */
  evolutions?: ShlagemonEvolution[]
  speciality: Speciality
}

export interface DexShlagemon extends Stats {
  id: string
  base: BaseShlagemon
  baseStats: Stats
  /**
   * ISO string representing the first time this Shlagémon was obtained.
   */
  captureDate: string
  /**
   * Number of times this Shlagémon has been captured or created via evolution.
   */
  captureCount: number
  lvl: number
  xp: number
  rarity: number
  sex: Sex
  isShiny: boolean
  hpCurrent: number
  /**
   * When true, this Shlagémon will evolve automatically without asking.
   */
  allowEvolution: boolean
  /**
   * ID of the item currently held by the Shlagémon, if any.
   */
  heldItemId?: string | null

  /**
   * When true, the rarity of this Shlagémon will always match its level.
   * Useful for the starter whose rarity scales with leveling.
   */
  rarityFollowsLevel?: boolean

  /**
   * Indicates that the player has not viewed or activated this Shlagémon yet.
   * Used to display a "new" badge in the dex until acknowledged.
   */
  isNew?: boolean
}
