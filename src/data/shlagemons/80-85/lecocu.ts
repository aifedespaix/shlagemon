import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const lecocu: BaseShlagemon = {
  id: 'lecocu',
  name: 'Lecocu',
  description: `Lecocu porte toujours un air triste : sa femme le trompe avec tous les dresseurs du coin. Malgré sa malchance amoureuse, il soigne les autres avec une gentillesse déconcertante.`,
  descriptionKey: 'data.shlagemons.80-85.lecocu.description',
  types: [shlagemonTypes.normal],
  coefficient: 84,
}

export default lecocu
