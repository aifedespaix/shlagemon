import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const parasecte: BaseShlagemon = {
  id: 'parasecte',
  name: 'Parasecte',
  description: 'data.shlagemons.evolutions.parasecte.description',
  types: [shlagemonTypes.poison, shlagemonTypes.spectre],
  speciality: 'evolution1',
}
export default parasecte
