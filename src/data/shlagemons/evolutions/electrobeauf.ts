import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const electrobeauf: BaseShlagemon = {
  id: 'electrobeauf',
  name: 'Électrobeauf',
  description: 'data.shlagemons.evolutions.electrobeauf.description',
  types: [shlagemonTypes.electrique],
  speciality: 'evolution1',
}
export default electrobeauf
