import type { BaseShlagemon } from '~/type'
import { ultraSteroid } from '~/data/items'
import { shlagemonTypes } from '../../shlagemons-type'
import macintosh from './macintosh'

export const masschopeur: BaseShlagemon = {
  id: 'masschopeur',
  name: 'data.shlagemons.evolutions.masschopeur.name',
  description: 'data.shlagemons.evolutions.masschopeur.description',
  types: [shlagemonTypes.combat],
  evolution: {
    base: macintosh,
    condition: {
      type: 'item',
      value: ultraSteroid,
    },
  },
  speciality: 'evolution1',
}
export default masschopeur
