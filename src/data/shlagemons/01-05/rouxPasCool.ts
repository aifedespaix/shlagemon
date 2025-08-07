import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import rouxScoop from '../evolutions/roux-scoop'

export const rouxPasCool: BaseShlagemon = {
  id: 'roux-pas-cool',
  name: 'data.shlagemons.01-05.rouxPasCool.name',
  description: 'data.shlagemons.01-05.rouxPasCool.description',
  types: [shlagemonTypes.vol],
  evolution: { base: rouxScoop, condition: { type: 'lvl', value: 18 } },
  speciality: 'evolution0',
}
export default rouxPasCool
