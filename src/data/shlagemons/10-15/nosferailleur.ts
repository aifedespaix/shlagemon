import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import nosferasta from '../evolutions/nosferasta'

export const nosferailleur: BaseShlagemon = {
  id: 'nosferailleur',
  name: 'data.shlagemons.10-15.nosferailleur.name',
  description: 'data.shlagemons.10-15.nosferailleur.description',

  types: [shlagemonTypes.poison, shlagemonTypes.vol],
  evolution: {
    base: nosferasta,
    condition: {
      type: 'lvl',
      value: 32,
    },
  },
  speciality: 'evolution0',
}
export default nosferailleur
