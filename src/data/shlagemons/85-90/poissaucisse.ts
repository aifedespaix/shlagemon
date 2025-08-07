import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import poissomerguez from '../evolutions/poissomerguez'

export const poissaucisse: BaseShlagemon = {
  id: 'poissaucisse',
  name: 'data.shlagemons.85-90.poissaucisse.name',
  description: 'data.shlagemons.85-90.poissaucisse.description',
  types: [shlagemonTypes.eau],
  evolution: {
    base: poissomerguez,
    condition: { type: 'lvl', value: 94 },
  },
  speciality: 'evolution0',
}
export default poissaucisse
