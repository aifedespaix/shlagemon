import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import boustiflemme from '../evolutions/boustiflemme'

export const chetibranle: BaseShlagemon = {
  id: 'chetibranle',
  name: 'Chétibranle',
  description: 'data.shlagemons.40-45.chetibranle.description',
  types: [shlagemonTypes.plante, shlagemonTypes.poison],
  evolution: {
    base: boustiflemme,
    condition: {
      type: 'lvl',
      value: 48,
    },
  },
  speciality: 'evolution0',
}
export default chetibranle
