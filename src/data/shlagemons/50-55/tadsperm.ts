import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import grostadsperm from '../evolutions/grostadsperm'

export const tadsperm: BaseShlagemon = {
  id: 'tadsperm',
  name: 'Tadsperm',
  description: 'data.shlagemons.50-55.tadsperm.description',
  types: [shlagemonTypes.poison],
  evolution: {
    base: grostadsperm,
    condition: {
      type: 'lvl',
      value: 59,
    },
  },
  speciality: 'evolution0',
}
export default tadsperm
