import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const heristrash: BaseShlagemon = {
  id: 'heristrash',
  name: 'data.shlagemons.evolutions.heristrash.name',
  description: 'data.shlagemons.evolutions.heristrash.description',
  types: [shlagemonTypes.feu, shlagemonTypes.poison],
  speciality: 'evolution2',
}
export default heristrash
