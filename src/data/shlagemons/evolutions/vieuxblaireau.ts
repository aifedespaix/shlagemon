import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const vieuxBlaireau: BaseShlagemon = {
  id: 'vieux-blaireau',
  name: 'Vieux Blaireau',
  description: 'data.shlagemons.evolutions.vieuxblaireau.description',
  types: [shlagemonTypes.sol],
  speciality: 'unique',
}
export default vieuxBlaireau
