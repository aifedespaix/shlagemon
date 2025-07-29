import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import grochichon from '../evolutions/grochichon'

export const rondonichon: BaseShlagemon = {
  id: 'rondonichon',
  name: 'Rondonichon',
  description: 'data.shlagemons.35-40.rondonichon.description',

  types: [shlagemonTypes.normal],
  evolution: {
    base: grochichon,
    condition: {
      type: 'lvl',
      value: 55,
    },
  },
  speciality: 'evolution0',
}
export default rondonichon
