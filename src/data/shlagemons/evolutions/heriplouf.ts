import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import heristrash from './heristrash'

export const heriplouf: BaseShlagemon = {
  id: 'heriplouf',
  name: 'Hériplouf',
  description: `A des seaux d’eau accrochés aux pattes pour "éteindre ses crises". En réalité, il pisse dans les flaques.`,
  types: [shlagemonTypes.feu, shlagemonTypes.eau],
  coefficient: 81,
  evolution: {
    base: heristrash,
    condition: { type: 'lvl', value: 95 },
  },
}

export default heriplouf
