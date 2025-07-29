import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const raichiotte: BaseShlagemon = {
  id: 'raichiotte',
  name: 'Raïchiotte',
  description: 'data.shlagemons.evolutions.raichiotte.description',
  types: [shlagemonTypes.electrique],
  speciality: 'evolution1',
}
export default raichiotte
