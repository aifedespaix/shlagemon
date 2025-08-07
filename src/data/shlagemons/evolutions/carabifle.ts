import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import tordturc from './tord-turc'

export const carabifle: BaseShlagemon = {
  id: 'carabifle',
  name: 'data.shlagemons.evolutions.carabifle.name',
  description: 'data.shlagemons.evolutions.carabifle.description',
  types: [shlagemonTypes.eau],
  evolution: { base: tordturc, condition: { type: 'lvl', value: 36 } },
  speciality: 'evolution1',
}
export default carabifle
