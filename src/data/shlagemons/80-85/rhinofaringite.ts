import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import rhinoplastie from '../evolutions/rhinoplastie'

export const rhinofaringite: BaseShlagemon = {
  id: 'rhinofaringite',
  name: 'data.shlagemons.80-85.rhinofaringite.name',
  description: 'data.shlagemons.80-85.rhinofaringite.description',
  types: [shlagemonTypes.sol, shlagemonTypes.roche],
  evolution: {
    base: rhinoplastie,
    condition: { type: 'lvl', value: 89 },
  },
  speciality: 'evolution0',
}
export default rhinofaringite
