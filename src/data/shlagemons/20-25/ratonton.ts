import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import ratartine from '../evolutions/ratartine'

export const ratonton: BaseShlagemon = {
  id: 'ratonton',
  name: 'data.shlagemons.20-25.ratonton.name',
  description: 'data.shlagemons.20-25.ratonton.description',
  types: [shlagemonTypes.normal],
  evolution: { base: ratartine, condition: { type: 'lvl', value: 45 } },
  speciality: 'evolution0',
}
export default ratonton
