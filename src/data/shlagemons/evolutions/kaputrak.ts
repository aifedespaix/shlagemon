import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const kaputrak: BaseShlagemon = {
  id: 'kaputrak',
  name: 'data.shlagemons.evolutions.kaputrak.name',
  description: 'data.shlagemons.evolutions.kaputrak.description',
  types: [shlagemonTypes.roche, shlagemonTypes.eau],
  speciality: 'evolution1',
}
export default kaputrak
