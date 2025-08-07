import type { BaseShlagemon } from '~/type'
import { steroids } from '~/data/items'
import { shlagemonTypes } from '../../shlagemons-type'
import masschopeur from '../evolutions/masschopeur'

export const macho: BaseShlagemon = {
  id: 'macho',
  name: 'data.shlagemons.35-40.macho.name',
  description: 'data.shlagemons.35-40.macho.description',
  types: [shlagemonTypes.combat],
  evolution: {
    base: masschopeur,
    condition: {
      type: 'item',
      value: steroids,
    },
  },
  speciality: 'evolution0',
}
export default macho
