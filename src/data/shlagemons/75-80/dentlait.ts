import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import hosoltueur from '../evolutions/hosoltueur'

export const dentlait: BaseShlagemon = {
  id: 'dentlait',
  name: 'Dentlait',
  description: `Dentlait n'a qu'une seule dent qui menace de tomber à tout moment. Il la protège jalousement et mord tout ce qui passe pour prouver qu'elle tient encore en place.`,
  types: [shlagemonTypes.sol],
  coefficient: 77,
  evolution: {
    base: hosoltueur,
    condition: { type: 'lvl', value: 83 },
  },
}

export default dentlait
