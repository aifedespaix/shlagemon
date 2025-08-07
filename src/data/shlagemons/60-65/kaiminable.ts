import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import croconaze from '../evolutions/croconaze'

export const kaiminable: BaseShlagemon = {
  id: 'kaiminable',
  name: 'data.shlagemons.60-65.kaiminable.name',
  description: 'data.shlagemons.60-65.kaiminable.description',
  types: [shlagemonTypes.eau],
  evolution: {
    base: croconaze,
    condition: { type: 'lvl', value: 78 },
  },
  speciality: 'evolution0',
}
export default kaiminable
