import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import dracoCon from './draco-con'

export const raptorincel: BaseShlagemon = {
  id: 'raptorincel',
  name: 'Raptor Incel',
  description: 'data.shlagemons.evolutions.raptorincel.description',
  types: [shlagemonTypes.feu],
  evolution: { base: dracoCon, condition: { type: 'lvl', value: 36 } },
  speciality: 'evolution1',
}
export default raptorincel
