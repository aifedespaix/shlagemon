import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import coxymort from './coxymort'

export const coksnif: BaseShlagemon = {
  id: 'coksnif',
  name: 'Coksnif',
  description: `Elle a maintenant 4 bras, un sac banane, et les narines couvertes de poussière blanche. Plane constamment.`,
  descriptionKey: 'data.shlagemons.evolutions.coksnif.description',
  types: [shlagemonTypes.insecte, shlagemonTypes.poison],
  coefficient: 75,
  evolutions: [{
    base: coxymort,
    condition: { type: 'lvl', value: 90 },
  }],
}

export default coksnif
