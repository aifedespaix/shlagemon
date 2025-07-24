import type { EggType } from '~/stores/egg'
import type { EggItemId } from '~/stores/eggBox'

export const eggTypeMap: Record<EggItemId, EggType> = {
  'oeuf-feu': 'feu',
  'oeuf-eau': 'eau',
  'oeuf-herbe': 'plante',
  'oeuf-psy': 'psy',
  'oeuf-foudre': 'electrique',
}
