import type { EggType } from '~/stores/egg'
import type { EggItemId } from '~/stores/eggBox'

export const eggTypeMap: Record<EggItemId, EggType> = {
  'oeuf-feu': 'feu',
  'oeuf-eau': 'eau',
  'oeuf-herbe': 'plante',
  'oeuf-psy': 'psy',
  'oeuf-foudre': 'electrique',
}

/** Maps each egg type to the corresponding text color classes. */
export const eggColorMap: Record<EggType, string> = {
  feu: 'text-orange-500 dark:text-orange-400',
  eau: 'text-blue-500 dark:text-blue-400',
  plante: 'text-green-500 dark:text-green-400',
  electrique: 'text-yellow-500 dark:text-yellow-400',
  psy: 'text-pink-500 dark:text-pink-400',
}

/**
 * Returns the text color classes associated with an egg type.
 */
export function eggColorClass(type: EggType): string {
  return eggColorMap[type] ?? ''
}
