import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const rhinoplastie: BaseShlagemon = {
  id: 'rhinoplastie',
  name: 'Rhinoplastie',
  description: 'data.shlagemons.evolutions.rhinoplastie.description',
  types: [shlagemonTypes.sol, shlagemonTypes.roche],
  speciality: 'evolution1',
}
export default rhinoplastie
