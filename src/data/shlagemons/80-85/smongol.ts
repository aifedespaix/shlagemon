import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import smongogol from '../evolutions/smongogol'

export const smongol: BaseShlagemon = {
  id: 'smongol',
  name: 'data.shlagemons.80-85.smongol.name',
  description: 'data.shlagemons.80-85.smongol.description',
  types: [shlagemonTypes.poison],
  evolution: {
    base: smongogol,
    condition: { type: 'lvl', value: 88 },
  },
  speciality: 'evolution0',
}
export default smongol
