import type { BaseShlagemon } from '~/type'
import { thunderStone } from '~/data/items/items'
import { shlagemonTypes } from '../../shlagemons-type'
import electrobeauf from '../evolutions/electrobeauf'

export const voltamere: BaseShlagemon = {
  id: 'voltamere',
  name: 'Voltamère',
  description: `Voltamère ressemble à une vieille daronne déguisée en boule. Il vole tout ce qui brille pour l'empiler dans son sac à main imaginaire. Gare à la décharge statique quand il te fouille les poches !`,
  types: [shlagemonTypes.electrique],
  coefficient: 74,
  evolution: {
    base: electrobeauf,
    condition: { type: 'item', value: thunderStone },
  },
}

export default voltamere
