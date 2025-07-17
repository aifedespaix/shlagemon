import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const languedepute: BaseShlagemon = {
  id: 'languedepute',
  name: 'Languedepute',
  description: `Sa langue interminable traîne partout et sert principalement à médire. Il aime critiquer ses adversaires jusqu'à ce qu'ils abandonnent par lassitude.`,
  types: [shlagemonTypes.normal],
  coefficient: 81,
}

export default languedepute
