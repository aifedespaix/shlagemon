import type { BaseShlagemon } from '~/type'
import { thunderStone } from '~/data/items/items'
import { shlagemonTypes } from '../../shlagemons-type'
import stabiscarosse from '../evolutions/stabiscarosse'

export const strabisme: BaseShlagemon = {
  id: 'strabisme',
  name: 'Strabisme',
  description: `Ses yeux partent chacun dans une direction différente, ce qui déstabilise ses adversaires. Il brille d'une lueur aquatique quand on lui parle de vacances au bord de la mer.`,
  descriptionKey: 'data.shlagemons.85-90.strabisme.description',
  types: [shlagemonTypes.eau],
  coefficient: 89,
  evolution: {
    base: stabiscarosse,
    condition: { type: 'item', value: thunderStone },
  },
}

export default strabisme
