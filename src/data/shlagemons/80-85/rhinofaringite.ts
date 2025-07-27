import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import rhinoplastie from '../evolutions/rhinoplastie'

export const rhinofaringite: BaseShlagemon = {
  id: 'rhinofaringite',
  name: 'Rhinofaringite',
  description: `Ce rhinocéros enrhumé éternue des rochers sur ses ennemis. Son nez coule en permanence, ce qui le rend aussi glissant qu'imprévisible.`,
  descriptionKey: 'data.shlagemons.80-85.rhinofaringite.description',
  types: [shlagemonTypes.sol, shlagemonTypes.roche],
  evolution: {
    base: rhinoplastie,
    condition: { type: 'lvl', value: 89 },
  },
  speciality: 'evolution0',
}
export default rhinofaringite
