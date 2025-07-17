import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import smongogol from '../evolutions/smongogol'

export const smongol: BaseShlagemon = {
  id: 'smongol',
  name: 'Smongol',
  description: `Smongol flotte dans une brume toxique et regarde le vide d'un air hébété. Il ne comprend pas grand-chose, mais il adore exploser quand on le secoue trop.`,
  types: [shlagemonTypes.poison],
  coefficient: 82,
  evolution: {
    base: smongogol,
    condition: { type: 'lvl', value: 88 },
  },
}

export default smongol
