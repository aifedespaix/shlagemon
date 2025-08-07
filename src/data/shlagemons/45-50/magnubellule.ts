import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import magnementon from '../evolutions/magnementon'

export const magnubellule: BaseShlagemon = {
  id: 'magnubellule',
  name: 'data.shlagemons.45-50.magnubellule.name',
  description: 'data.shlagemons.45-50.magnubellule.description',
  types: [shlagemonTypes.electrique, shlagemonTypes.insecte],

  evolution: {
    base: magnementon,
    condition: {
      type: 'lvl',
      value: 61,
    },
  },
  speciality: 'evolution0',
}
export default magnubellule
