import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const rouxPignolage: BaseShlagemon = {
  id: 'roux-pignolage',
  name: 'Roux Pignolage',
  description: 'data.shlagemons.evolutions.roux-pignolage.description',
  types: [shlagemonTypes.normal, shlagemonTypes.vol],
  speciality: 'unique',
}
export default rouxPignolage
