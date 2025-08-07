import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import leviaraison from '../evolutions/leviaraison'

export const marginal: BaseShlagemon = {
  id: 'marginal',
  name: 'data.shlagemons.50-55.marginal.name',
  description: 'data.shlagemons.50-55.marginal.description',
  types: [shlagemonTypes.eau],
  evolution: {
    base: leviaraison,
    condition: { type: 'lvl', value: 100 },
  },
  speciality: 'evolution0',
}
export default marginal
