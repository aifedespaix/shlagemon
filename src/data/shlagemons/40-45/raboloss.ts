import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import flaclodoss from '../evolutions/flaclodoss'

export const raboloss: BaseShlagemon = {
  id: 'raboloss',
  name: 'data.shlagemons.40-45.raboloss.name',
  description: 'data.shlagemons.40-45.raboloss.description',
  types: [shlagemonTypes.eau, shlagemonTypes.psy],
  evolution: {
    base: flaclodoss,
    condition: {
      type: 'lvl',
      value: 67,
    },
  },
  speciality: 'evolution0',
}
export default raboloss
