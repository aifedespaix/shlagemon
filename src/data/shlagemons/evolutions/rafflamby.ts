import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const rafflamby: BaseShlagemon = {
  id: 'rafflamby',
  name: 'data.shlagemons.evolutions.rafflamby.name',
  description: 'data.shlagemons.evolutions.rafflamby.description',

  types: [shlagemonTypes.plante, shlagemonTypes.poison],
  speciality: 'evolution2',
}
export default rafflamby
