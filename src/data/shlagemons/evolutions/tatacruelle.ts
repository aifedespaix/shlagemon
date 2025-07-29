import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const tatacruelle: BaseShlagemon = {
  id: 'tatacruelle',
  name: 'Tatacruelle',
  description: 'data.shlagemons.evolutions.tatacruelle.description',
  types: [shlagemonTypes.eau, shlagemonTypes.poison],
  speciality: 'evolution1',
}
export default tatacruelle
