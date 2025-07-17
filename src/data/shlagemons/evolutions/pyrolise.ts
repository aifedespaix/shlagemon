import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const pyrolise: BaseShlagemon = {
  id: 'pyrolise',
  name: 'Pyrolise',
  description: `Toujours entouré d’une fumée douteuse, Pyrolise adore brûler tout ce qu’il touche et sentir les vapeurs toxiques.`,
  types: [shlagemonTypes.feu],
  coefficient: 60,
}

export default pyrolise
