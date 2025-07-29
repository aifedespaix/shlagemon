import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const lokhlash: BaseShlagemon = {
  id: 'lokhlash',
  name: 'Lokhlash',
  description: 'data.shlagemons.95-99.lokhlash.description',
  types: [shlagemonTypes.eau, shlagemonTypes.glace],
  speciality: 'unique',
}
export default lokhlash
