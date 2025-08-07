import type { BaseShlagemon } from '~/type'
import { thunderStone } from '~/data/items'
import { shlagemonTypes } from '../../shlagemons-type'
import raichiotte from '../evolutions/raichiotte'

export const pikachiant: BaseShlagemon = {
  id: 'pikachiant',
  name: 'data.shlagemons.15-20.pikachiant.name',
  description: 'data.shlagemons.15-20.pikachiant.description',
  types: [shlagemonTypes.electrique],
  evolution: {
    base: raichiotte,
    condition: {
      type: 'item',
      value: thunderStone,
    },
  },
  speciality: 'evolution0',
}
export default pikachiant
