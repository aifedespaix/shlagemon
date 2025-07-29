import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import heriplouf from '../evolutions/heriplouf'

export const hericouille: BaseShlagemon = {
  id: 'hericouille',
  name: 'Héricouille',
  description: 'data.shlagemons.65-70.hericouille.description',
  types: [shlagemonTypes.feu],
  evolution: {
    base: heriplouf,
    condition: { type: 'lvl', value: 81 },
  },
  speciality: 'evolution0',
}
export default hericouille
