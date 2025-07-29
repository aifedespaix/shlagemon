import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import accrocrack from '../evolutions/accrocrack'

export const psykonaute: BaseShlagemon = {
  id: 'psykonaute',
  name: 'Psykonaute',
  description: 'data.shlagemons.35-40.psykonaute.description',
  types: [shlagemonTypes.eau],
  evolution: {
    base: accrocrack,
    condition: {
      type: 'lvl',
      value: 85,
    },
  },
  speciality: 'evolution0',
}
export default psykonaute
