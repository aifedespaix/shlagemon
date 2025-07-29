import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import coconnul from '../evolutions/coconnul'

export const aspigros: BaseShlagemon = {
  id: 'aspigros',
  name: 'Aspigros',
  evolution: {
    base: coconnul,
    condition: {
      type: 'lvl',
      value: 14,
    },
  },
  description: 'data.shlagemons.05-10.aspigros.description',
  types: [shlagemonTypes.insecte],
  speciality: 'evolution0',
}
export default aspigros
