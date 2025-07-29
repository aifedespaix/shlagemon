import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import triopikouze from '../evolutions/triopikouze'

export const taupicouze: BaseShlagemon = {
  id: 'taupicouze',
  name: 'Taupicouze',
  description: 'data.shlagemons.25-30.taupicouze.description',
  types: [shlagemonTypes.sol],
  evolution: {
    base: triopikouze,
    condition: {
      type: 'lvl',
      value: 38,
    },
  },
  speciality: 'evolution0',
}
export default taupicouze
