import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import poissomerguez from '../evolutions/poissomerguez'

export const poissocisse: BaseShlagemon = {
  id: 'poissocisse',
  name: 'Poissocisse',
  description: `Poissocisse se nourrit exclusivement de saucisses. Son odeur charcutière attire chiens et dresseurs affamés, ce qui le rend paradoxalement difficile à pêcher.`,
  types: [shlagemonTypes.eau],
  coefficient: 88,
  evolution: {
    base: poissomerguez,
    condition: { type: 'lvl', value: 94 },
  },
}

export default poissocisse
