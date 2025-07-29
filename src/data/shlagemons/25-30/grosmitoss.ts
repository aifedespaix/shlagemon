import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import aerobite from '../evolutions/aerobite'

export const grosmitoss: BaseShlagemon = {
  id: 'grosmitoss',
  name: 'GrosMitoss',
  description: 'data.shlagemons.25-30.grosmitoss.description',
  types: [shlagemonTypes.insecte, shlagemonTypes.poison],
  evolution: {
    base: aerobite,
    condition: {
      type: 'lvl',
      value: 69,
    },
  },

  speciality: 'evolution0',
}
export default grosmitoss
