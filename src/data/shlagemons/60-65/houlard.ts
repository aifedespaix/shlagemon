import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import noctedard from '../evolutions/noctedard'

export const houlard: BaseShlagemon = {
  id: 'houlard',
  name: 'data.shlagemons.60-65.houlard.name',
  description: 'data.shlagemons.60-65.houlard.description',
  types: [shlagemonTypes.vol, shlagemonTypes.psy],
  evolution: {
    base: noctedard,
    condition: { type: 'lvl', value: 80 },
  },
  speciality: 'evolution0',
}
export default houlard
