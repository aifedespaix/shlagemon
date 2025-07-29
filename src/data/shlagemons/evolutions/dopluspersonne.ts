import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const dopluspersonne: BaseShlagemon = {
  id: 'dopluspersonne',
  name: 'Dopluspersonne',
  description: 'data.shlagemons.evolutions.dopluspersonne.description',
  types: [shlagemonTypes.normal, shlagemonTypes.vol],
  speciality: 'evolution1',
}
export default dopluspersonne
