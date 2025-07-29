import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const grosseflemme: BaseShlagemon = {
  id: 'grosseflemme',
  name: 'Grosseflemme',
  description: 'data.shlagemons.evolutions.grosseflemme.description',
  types: [shlagemonTypes.roche, shlagemonTypes.sol],
  speciality: 'evolution2',
}
export default grosseflemme
