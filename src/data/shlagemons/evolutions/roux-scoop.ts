import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import { rouxPignolage } from './roux-pignolage'

export const rouxScoop: BaseShlagemon = {
  id: 'roux-scoop',
  name: 'data.shlagemons.evolutions.roux-scoop.name',
  description: 'data.shlagemons.evolutions.roux-scoop.description',
  types: [shlagemonTypes.normal, shlagemonTypes.vol],
  evolution: { base: rouxPignolage, condition: { type: 'lvl', value: 36 } },
  speciality: 'evolution0',
}
export default rouxScoop
