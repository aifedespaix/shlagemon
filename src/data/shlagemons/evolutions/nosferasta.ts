import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const nosferasta: BaseShlagemon = {
  id: 'nosferasta',
  name: 'Nosferasta',
  description: 'data.shlagemons.evolutions.nosferasta.description',

  types: [shlagemonTypes.poison, shlagemonTypes.vol],
  speciality: 'evolution1',
}
export default nosferasta
