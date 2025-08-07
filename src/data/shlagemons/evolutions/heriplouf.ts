import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import heristrash from './heristrash'

export const heriplouf: BaseShlagemon = {
  id: 'heriplouf',
  name: 'data.shlagemons.evolutions.heriplouf.name',
  description: 'data.shlagemons.evolutions.heriplouf.description',
  types: [shlagemonTypes.feu, shlagemonTypes.eau],
  evolution: {
    base: heristrash,
    condition: { type: 'lvl', value: 95 },
  },
  speciality: 'evolution1',
}
export default heriplouf
