import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const ricardnin: BaseShlagemon = {
  id: 'ricardnin',
  name: 'Ricardnin',
  description: 'data.shlagemons.evolutions.ricardnin.description',
  types: [shlagemonTypes.feu, shlagemonTypes.eau],
  speciality: 'evolution1',
}
export default ricardnin
