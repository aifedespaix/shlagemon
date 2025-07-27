import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const moisanium: BaseShlagemon = {
  id: 'moisanium',
  name: 'Moisanium',
  description: `Géante plante décrépite, tachetée de moisissure, avec des spores hallucinogènes. Elle rigole toute seule dans les champs.`,
  descriptionKey: 'data.shlagemons.evolutions.moisanium.description',
  types: [shlagemonTypes.plante, shlagemonTypes.poison],
  speciality: 'evolution2',
}
export default moisanium
