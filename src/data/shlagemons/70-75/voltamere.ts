import type { BaseShlagemon } from '~/type'
import { thunderStone } from '~/data/items'
import { shlagemonTypes } from '../../shlagemons-type'
import electrobeauf from '../evolutions/electrobeauf'

export const voltamere: BaseShlagemon = {
  id: 'voltamere',
  name: 'data.shlagemons.70-75.voltamere.name',
  description: 'data.shlagemons.70-75.voltamere.description',
  types: [shlagemonTypes.electrique],
  evolution: {
    base: electrobeauf,
    condition: { type: 'item', value: thunderStone },
  },
  speciality: 'evolution0',
}
export default voltamere
