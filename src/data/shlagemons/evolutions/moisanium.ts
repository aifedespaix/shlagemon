import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const moisanium: BaseShlagemon = {
  id: 'moisanium',
  name: 'Moisanium',
  description: `Géante plante décrépite, tachetée de moisissure, avec des spores hallucinogènes. Elle rigole toute seule dans les champs.`,
  types: [shlagemonTypes.plante, shlagemonTypes.poison],
  coefficient: 94,
}

export default moisanium
