import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import beuleef from '../evolutions/beuleef'

export const glandignon: BaseShlagemon = {
  id: 'glandignon',
  name: 'Glandignon',
  description: `Bébé plante molle et poisseuse. Le bulbe sur sa tête suinte. Odeur de chaussette trempée.`,
  types: [shlagemonTypes.plante],
  coefficient: 66,
  evolution: {
    base: beuleef,
    condition: { type: 'lvl', value: 78 },
  },
}

export default glandignon
