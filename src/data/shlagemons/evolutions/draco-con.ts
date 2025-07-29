import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const dracoCon: BaseShlagemon = {
  id: 'draco-con',
  name: 'Draco Con',
  description: 'data.shlagemons.evolutions.draco-con.description',
  types: [shlagemonTypes.feu, shlagemonTypes.vol],
  speciality: 'unique',
}
export default dracoCon
