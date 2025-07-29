import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import vieuxBlaireau from '../evolutions/vieuxblaireau'

export const jeunebelette: BaseShlagemon = {
  id: 'jeunebelette',
  name: 'Jeunebelette',
  description: 'data.shlagemons.01-05.jeunebelette.description',
  types: [shlagemonTypes.sol],
  evolution: {
    base: vieuxBlaireau,
    condition: {
      type: 'lvl',
      value: 5,
    },
  },
  speciality: 'evolution0',
}
export default jeunebelette
