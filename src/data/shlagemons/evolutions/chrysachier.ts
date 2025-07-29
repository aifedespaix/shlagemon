import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import { papysucon } from './papi-sucon'

export const chrysachier: BaseShlagemon = {
  id: 'chrysachier',
  name: 'Chrysachier',
  evolution: {
    base: papysucon,
    condition: {
      type: 'lvl',
      value: 25,
    },
  },
  description: 'data.shlagemons.evolutions.chrysachier.description',
  types: [shlagemonTypes.insecte],
  speciality: 'evolution1',
}
export default chrysachier
