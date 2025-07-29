import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const moisanium: BaseShlagemon = {
  id: 'moisanium',
  name: 'Moisanium',
  description: 'data.shlagemons.evolutions.moisanium.description',
  types: [shlagemonTypes.plante, shlagemonTypes.poison],
  speciality: 'evolution2',
}
export default moisanium
