import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import tatacruelle from '../evolutions/tatacruelle'

export const tatacool: BaseShlagemon = {
  id: 'tatacool',
  name: 'Tatacool',
  description: 'data.shlagemons.40-45.tatacool.description',
  types: [shlagemonTypes.eau, shlagemonTypes.poison],
  evolution: {
    base: tatacruelle,
    condition: {
      type: 'lvl',
      value: 53,
    },
  },

  speciality: 'evolution0',
}
export default tatacool
