import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import hosoltueur from '../evolutions/hosoltueur'

export const dentlait: BaseShlagemon = {
  id: 'dentlait',
  name: 'data.shlagemons.75-80.dentlait.name',
  description: 'data.shlagemons.75-80.dentlait.description',
  types: [shlagemonTypes.sol],
  evolution: {
    base: hosoltueur,
    condition: { type: 'lvl', value: 83 },
  },
  speciality: 'evolution0',
}
export default dentlait
