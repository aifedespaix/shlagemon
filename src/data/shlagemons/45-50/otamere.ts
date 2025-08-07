import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import lamantinedu38 from '../evolutions/lamantinedu38'

export const otamere: BaseShlagemon = {
  id: 'otamere',
  name: 'data.shlagemons.45-50.otamere.name',
  description: 'data.shlagemons.45-50.otamere.description',
  types: [shlagemonTypes.eau],

  evolution: {
    base: lamantinedu38,
    condition: {
      type: 'lvl',
      value: 90,
    },
  },
  speciality: 'evolution0',
}
export default otamere
