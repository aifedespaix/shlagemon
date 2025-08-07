import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import feunouille from '../evolutions/feunouille'

export const goubite: BaseShlagemon = {
  id: 'goubite',
  name: 'data.shlagemons.15-20.goubite.name',
  description: 'data.shlagemons.15-20.goubite.description',
  types: [shlagemonTypes.feu],
  evolution: {
    base: feunouille,
    condition: {
      type: 'lvl',
      value: 80,
    },
  },
  speciality: 'evolution0',
}
export default goubite
