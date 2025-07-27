import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const salmoneli: BaseShlagemon = {
  id: 'salmoneli',
  name: 'Salmoneli',
  description: `Ce poisson aux couleurs ternes traîne des germes partout où il passe et préfère l’eau croupie.`,
  descriptionKey: 'data.shlagemons.evolutions.salmoneli.description',
  types: [shlagemonTypes.eau],
  speciality: 'evolution1',
}
export default salmoneli
