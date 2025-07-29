import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const hyporuisseau: BaseShlagemon = {
  id: 'hyporuisseau',
  name: 'Hyporuisseau',
  description: 'data.shlagemons.evolutions.hyporuisseau.description',
  types: [shlagemonTypes.eau],
  speciality: 'evolution1',
}
export default hyporuisseau
