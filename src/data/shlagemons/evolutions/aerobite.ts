import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const aerobite: BaseShlagemon = {
  id: 'aerobite',
  name: 'Aérobite',
  description: 'data.shlagemons.evolutions.aerobite.description',
  types: [shlagemonTypes.insecte, shlagemonTypes.poison],
  speciality: 'evolution1',
}
export default aerobite
