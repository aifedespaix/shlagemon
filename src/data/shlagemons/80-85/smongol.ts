import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import smongogol from '../evolutions/smongogol'

export const smongol: BaseShlagemon = {
  id: 'smongol',
  name: 'Smongol',
  description: `Smongol flotte dans une brume toxique et regarde le vide d'un air hébété. Il ne comprend pas grand-chose, mais il adore exploser quand on le secoue trop.`,
  descriptionKey: 'data.shlagemons.80-85.smongol.description',
  types: [shlagemonTypes.poison],
  evolution: {
    base: smongogol,
    condition: { type: 'lvl', value: 88 },
  },
  speciality: 'evolution0',
}
export default smongol
