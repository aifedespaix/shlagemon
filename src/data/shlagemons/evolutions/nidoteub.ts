import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import nidodragqueen from './nidodragqueen'

export const nidoteub: BaseShlagemon = {
  id: 'nidoteub',
  name: 'data.shlagemons.evolutions.nidoteub.name',
  description: 'data.shlagemons.evolutions.nidoteub.description',
  types: [shlagemonTypes.poison],

  evolution: {
    base: nidodragqueen,
    condition: {
      type: 'lvl',
      value: 88,
    },
  },
  speciality: 'evolution1',
}
export default nidoteub
