import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import poissomerguez from '../evolutions/poissomerguez'

export const poissaucisse: BaseShlagemon = {
  id: 'poissaucisse',
  name: 'Poissaucisse',
  description: `Poissocisse se nourrit exclusivement de saucisses. Son odeur charcutière attire chiens et dresseurs affamés, ce qui le rend paradoxalement difficile à pêcher.`,
  descriptionKey: 'data.shlagemons.85-90.poissaucisse.description',
  types: [shlagemonTypes.eau],
  coefficient: 88,
  evolution: {
    base: poissomerguez,
    condition: { type: 'lvl', value: 94 },
  },
}

export default poissaucisse
