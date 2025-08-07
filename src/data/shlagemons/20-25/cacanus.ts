import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import ricardnin from '../evolutions/ricardnin'

export const cacanus: BaseShlagemon = {
  id: 'cacanus',
  name: 'data.shlagemons.20-25.cacanus.name',
  description: 'data.shlagemons.20-25.cacanus.description',
  types: [shlagemonTypes.feu, shlagemonTypes.poison],
  evolution: {
    base: ricardnin,
    condition: {
      type: 'lvl',
      value: 54,
    },
  },
  speciality: 'evolution0',
}
export default cacanus
