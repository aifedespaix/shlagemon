import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import drapcon from '../evolutions/drapcon'

export const minidrapcon: BaseShlagemon = {
  id: 'minidrapcon',
  name: 'Minidrapcon',
  description: `Petit serpent drapé et un peu demeuré, il se prend souvent les crochets dans ses propres replis.`,
  types: [shlagemonTypes.dragon],
  coefficient: 67,
  evolution: {
    base: drapcon,
    condition: { type: 'lvl', value: 90 },
  },
}

export default minidrapcon
