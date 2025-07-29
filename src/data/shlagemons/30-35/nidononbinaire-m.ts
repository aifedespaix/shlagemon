import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import nidoteub from '../evolutions/nidoteub'

export const nidononbinaireM: BaseShlagemon = {
  id: 'nidononbinaire-m',
  name: 'Nidononbinaire♂',
  description: 'data.shlagemons.30-35.nidononbinaire-m.description',
  types: [shlagemonTypes.poison],
  evolution: {
    base: nidoteub,
    condition: {
      type: 'lvl',
      value: 66,
    },
  },
  speciality: 'evolution0',
}
export default nidononbinaireM
