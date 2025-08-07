import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'
import { carabifle } from './evolutions/carabifle'

export const carapouffe: BaseShlagemon = {
  id: 'carapouffe',
  name: 'data.shlagemons.carapouffe.name',
  description: 'data.shlagemons.carapouffe.description',
  types: [shlagemonTypes.eau],
  evolution: { base: carabifle, condition: { type: 'lvl', value: 16 } },
  speciality: 'evolution0',
}
export default carapouffe
