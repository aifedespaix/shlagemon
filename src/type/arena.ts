import type { Character } from './character'
import type { BaseShlagemon } from './shlagemon'

/**
 * Identifiers for every arena badge.
 *
 * These identifiers also match the corresponding icon filenames located in
 * `public/icons/badges`.
 */
export type ArenaBadgeId = 'couillasse' | 'sock' | 'mystic-onion' | 'buttered-toast' | 'space'

/**
 * Metadata describing an arena badge.
 *
 * `name` is an i18n key that must be translated at render time.
 * The badge image can be derived from the `id` and is therefore omitted here.
 */
export interface ArenaBadge {
  id: ArenaBadgeId
  /** Translation key for the badge name. */
  name: string
  /** Maximum capture level allowed after earning this badge. */
  levelCap: number
}

export type LineupFactory = () => BaseShlagemon[]

export interface Arena {
  id: string
  badge: ArenaBadge
  character: Character
  readonly lineup: BaseShlagemon[] | LineupFactory
  level: number
  requiredBadgeId?: string
}
