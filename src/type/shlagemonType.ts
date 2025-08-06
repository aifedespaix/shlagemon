import type { I18nKey } from './i18n'

/**
 * Union of all valid Shlagémon type identifiers.
 */
export type TypeName
  = 'normal'
    | 'feu'
    | 'eau'
    | 'plante'
    | 'roche'
    | 'electrique'
    | 'vol'
    | 'combat'
    | 'spectre'
    | 'darksasuke'
    | 'psy'
    | 'poison'
    | 'metal'
    | 'sol'
    | 'fee'
    | 'dragon'
    | 'glace'
    | 'insecte'

/**
 * Describes a Shlagémon elemental type.
 */
export interface ShlagemonType {
  /** Unique identifier of the type. */
  id: TypeName
  /** Translation key for the display name. */
  name: I18nKey
  /** Translation key describing the type. */
  description: I18nKey
  /** Hex color associated with the type. */
  color: string
  /**
   * Type identifiers resisted by this type.
   * Using identifiers avoids circular references between type objects.
   */
  resistance: TypeName[]
  /** Type identifiers that deal extra damage to this type. */
  weakness: TypeName[]
  /** Additional tags used for filtering or search. */
  tags: string[]
  /** Passive effects granted by this type. */
  passiveEffects: string[]
}
