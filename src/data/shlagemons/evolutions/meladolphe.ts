import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const meladolphe: BaseShlagemon = {
  id: 'meladolphe',
  name: 'Méladolphe',
  description: 'data.shlagemons.evolutions.meladolphe.description',

  types: [shlagemonTypes.fee],
  speciality: 'evolution1',
}
export default meladolphe
