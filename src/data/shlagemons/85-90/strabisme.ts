import type { BaseShlagemon } from '~/type'
import { thunderStone } from '~/data/items'
import { shlagemonTypes } from '../../shlagemons-type'
import stabiscarosse from '../evolutions/stabiscarosse'

export const strabisme: BaseShlagemon = {
  id: 'strabisme',
  name: 'Strabisme',
  description: 'data.shlagemons.85-90.strabisme.description',
  types: [shlagemonTypes.eau],
  evolution: {
    base: stabiscarosse,
    condition: { type: 'item', value: thunderStone },
  },
  speciality: 'evolution0',
}
export default strabisme
