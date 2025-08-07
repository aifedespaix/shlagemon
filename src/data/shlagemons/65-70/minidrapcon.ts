import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import drapcon from '../evolutions/drapcon'

export const minidrapcon: BaseShlagemon = {
  id: 'minidrapcon',
  name: 'data.shlagemons.65-70.minidrapcon.name',
  description: 'data.shlagemons.65-70.minidrapcon.description',
  types: [shlagemonTypes.dragon],
  evolution: {
    base: drapcon,
    condition: { type: 'lvl', value: 90 },
  },
  speciality: 'evolution0',
}
export default minidrapcon
