import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import beuleef from '../evolutions/beuleef'

export const glandignon: BaseShlagemon = {
  id: 'glandignon',
  name: 'Glandignon',
  description: 'data.shlagemons.65-70.glandignon.description',
  types: [shlagemonTypes.plante],
  evolution: {
    base: beuleef,
    condition: { type: 'lvl', value: 78 },
  },
  speciality: 'evolution0',
}
export default glandignon
