import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import kadavrebras from '../evolutions/kadavrebras'

export const abraquemar: BaseShlagemon = {
  id: 'abraquemar',
  name: 'Abraquemar',
  evolution: {
    base: kadavrebras,
    condition: {
      type: 'lvl',
      value: 46,
    },
  },
  description: 'data.shlagemons.10-15.abraquemar.description',
  types: [shlagemonTypes.psy],
  speciality: 'evolution0',
}
export default abraquemar
