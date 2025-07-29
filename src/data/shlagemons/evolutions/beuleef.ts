import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import moisanium from './moisanium'

export const beuleef: BaseShlagemon = {
  id: 'beuleef',
  name: 'Beuleef',
  description: 'data.shlagemons.evolutions.beuleef.description',
  types: [shlagemonTypes.plante],
  evolution: {
    base: moisanium,
    condition: { type: 'lvl', value: 92 },
  },
  speciality: 'evolution1',
}
export default beuleef
