import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const magnementon: BaseShlagemon = {
  id: 'magnementon',
  name: 'Magnementon',
  description: 'data.shlagemons.evolutions.magnementon.description',
  types: [shlagemonTypes.electrique, shlagemonTypes.insecte],
  speciality: 'evolution1',
}
export default magnementon
