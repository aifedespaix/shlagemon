import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const hyporuisseau: BaseShlagemon = {
  id: 'hyporuisseau',
  name: 'Hyporuisseau',
  description: `Hyporuisseau ne nage que dans les petits ruisseaux par peur des grandes eaux. Son courage grandit à mesure que le débit augmente, mais pas trop quand même.`,
  types: [shlagemonTypes.eau],
  coefficient: 92,
}

export default hyporuisseau
