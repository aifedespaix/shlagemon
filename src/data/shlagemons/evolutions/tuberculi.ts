import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const tuberculi: BaseShlagemon = {
  id: 'tuberculi',
  name: 'Tuberculi',
  description: `Permanemment parcouru d’étincelles maladives, Tuberculi tousse des arcs électriques sur ses adversaires.`,
  descriptionKey: 'data.shlagemons.evolutions.tuberculi.description',
  types: [shlagemonTypes.electrique],
}

export default tuberculi
