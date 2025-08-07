import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const feunouille: BaseShlagemon = {
  id: 'feunouille',
  name: 'data.shlagemons.evolutions.feunouille.name',
  description: 'data.shlagemons.evolutions.feunouille.description',

  types: [shlagemonTypes.feu],
  speciality: 'evolution1',
}
export default feunouille
