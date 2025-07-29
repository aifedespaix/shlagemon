import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import perchiste from '../evolutions/perchiste'

export const waouff: BaseShlagemon = {
  id: 'waouff',
  name: 'Waouff',
  description: 'data.shlagemons.25-30.waouff.description',
  types: [shlagemonTypes.normal],
  evolution: {
    base: perchiste,
    condition: {
      type: 'lvl',
      value: 38,
    },
  },
  speciality: 'evolution0',
}
export default waouff
