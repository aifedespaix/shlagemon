import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const barbok: BaseShlagemon = {
  id: 'barbok',
  name: 'Barbok',
  description: 'data.shlagemons.evolutions.barbok.description',
  types: [shlagemonTypes.poison],
  speciality: 'evolution1',
}
export default barbok
