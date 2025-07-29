import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'
import raptorincel from './evolutions/raptorincel'

export const salamiches: BaseShlagemon = {
  id: 'salamiches',
  name: 'Salamiches',
  description: 'data.shlagemons.salamiches.description',
  types: [shlagemonTypes.feu],
  evolution: { base: raptorincel, condition: { type: 'lvl', value: 16 } },
  speciality: 'evolution0',
}
export default salamiches
