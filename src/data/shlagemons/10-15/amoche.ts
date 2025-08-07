import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import barbok from '../evolutions/barbok'

export const amoche: BaseShlagemon = {
  id: 'amoche',
  name: 'data.shlagemons.10-15.amoche.name',
  description: 'data.shlagemons.10-15.amoche.description',
  types: [shlagemonTypes.poison],
  evolution: { base: barbok, condition: { type: 'lvl', value: 42 } },
  speciality: 'evolution0',
}
export default amoche
