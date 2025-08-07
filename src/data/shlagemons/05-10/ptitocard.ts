import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import grossetarte from '../evolutions/grossetarte'

export const ptitocard: BaseShlagemon = {
  id: 'ptitocard',
  name: 'data.shlagemons.05-10.ptitocard.name',
  description: 'data.shlagemons.05-10.ptitocard.description',
  types: [shlagemonTypes.eau],
  evolution: {
    base: grossetarte,
    condition: {
      type: 'lvl',
      value: 50,
    },
  },
  speciality: 'evolution0',
}
export default ptitocard
