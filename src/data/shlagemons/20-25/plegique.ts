import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import parasecte from '../evolutions/parasecte'

export const plegique: BaseShlagemon = {
  id: 'plegique',
  name: 'Plégique',
  description: 'data.shlagemons.20-25.plegique.description',
  types: [shlagemonTypes.insecte, shlagemonTypes.poison],
  evolution: {
    base: parasecte,
    condition: {
      type: 'lvl',
      value: 45,
    },
  },
  speciality: 'evolution0',
}
export default plegique
