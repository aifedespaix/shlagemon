import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import chrysachier from '../evolutions/chrysachier'

export const chenipaon: BaseShlagemon = {
  id: 'chenipaon',
  name: 'Chenipaon',
  evolution: {
    base: chrysachier,
    condition: {
      type: 'lvl',
      value: 14,
    },
  },
  description: 'data.shlagemons.05-10.chenipaon.description',
  types: [shlagemonTypes.insecte],
  speciality: 'evolution0',
}
export default chenipaon
