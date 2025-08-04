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
  /** Display name used in UI. */
  name: string
  /** i18n key describing the type. */
  description: string
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
