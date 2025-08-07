import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import nidoschneck from '../evolutions/nidoschneck'

export const nidononbinaireF: BaseShlagemon = {
  id: 'nidononbinaire-f',
  name: 'data.shlagemons.30-35.nidononbinaire-f.name',
  description: 'data.shlagemons.30-35.nidononbinaire-f.description',
  types: [shlagemonTypes.poison],
  evolution: {
    base: nidoschneck,
    condition: {
      type: 'lvl',
      value: 66,
    },
  },
  speciality: 'evolution0',
}
export default nidononbinaireF
