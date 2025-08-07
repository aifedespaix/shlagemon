import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import gravaglaire from '../evolutions/gravaglaire'

export const racaillou: BaseShlagemon = {
  id: 'racaillou',
  name: 'data.shlagemons.40-45.racaillou.name',
  description: 'data.shlagemons.40-45.racaillou.description',
  types: [shlagemonTypes.roche, shlagemonTypes.sol],
  evolution: {
    base: gravaglaire,
    condition: {
      type: 'lvl',
      value: 76,
    },
  },
  speciality: 'evolution0',
}
export default racaillou
