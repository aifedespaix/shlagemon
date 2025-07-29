import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import krabbolosse from '../evolutions/krabbolosse'

export const krabbyjaccob: BaseShlagemon = {
  id: 'krabbyjaccob',
  name: 'Krabbyjaccob',
  description: 'data.shlagemons.70-75.krabbyjaccob.description',
  types: [shlagemonTypes.eau],
  evolution: {
    base: krabbolosse,
    condition: { type: 'lvl', value: 79 },
  },
  speciality: 'evolution0',
}
export default krabbyjaccob
