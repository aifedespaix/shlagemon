import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import heristrash from './heristrash'

export const heriplouf: BaseShlagemon = {
  id: 'heriplouf',
  name: 'Hériplouf',
  description: `A des seaux d’eau accrochés aux pattes pour "éteindre ses crises". En réalité, il pisse dans les flaques.`,
  descriptionKey: 'data.shlagemons.evolutions.heriplouf.description',
  types: [shlagemonTypes.feu, shlagemonTypes.eau],
  evolution: {
    base: heristrash,
    condition: { type: 'lvl', value: 95 },
  },
  speciality: 'evolution1',
}
export default heriplouf
