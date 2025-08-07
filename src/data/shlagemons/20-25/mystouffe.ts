import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import orchibre from '../evolutions/orchibre'

export const mystouffe: BaseShlagemon = {
  id: 'mystouffe',
  name: 'data.shlagemons.20-25.mystouffe.name',
  description: 'data.shlagemons.20-25.mystouffe.description',

  types: [shlagemonTypes.plante, shlagemonTypes.poison],
  evolution: {
    base: orchibre,
    condition: {
      type: 'lvl',
      value: 62,
    },
  },
  speciality: 'evolution0',
}
export default mystouffe
