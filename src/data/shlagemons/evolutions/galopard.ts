import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const galopard: BaseShlagemon = {
  id: 'galopard',
  name: 'data.shlagemons.evolutions.galopard.name',
  description: 'data.shlagemons.evolutions.galopard.description',
  types: [shlagemonTypes.feu],
  speciality: 'evolution1',
}
export default galopard
