import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import galopard from '../evolutions/galopard'

export const pouleyta: BaseShlagemon = {
  id: 'pouleyta',
  name: 'Pouleyta',
  description: 'data.shlagemons.45-50.pouleyta.description',
  types: [shlagemonTypes.feu],
  evolution: {
    base: galopard,
    condition: {
      type: 'lvl',
      value: 53,
    },
  },
  speciality: 'evolution0',
}
export default pouleyta
