import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import beuleef from '../evolutions/beuleef'

export const glandignon: BaseShlagemon = {
  id: 'glandignon',
  name: 'Glandignon',
  description: `Bébé plante molle et poisseuse. Le bulbe sur sa tête suinte. Odeur de chaussette trempée.`,
  descriptionKey: 'data.shlagemons.65-70.glandignon.description',
  types: [shlagemonTypes.plante],
  evolution: {
    base: beuleef,
    condition: { type: 'lvl', value: 78 },
  },
  speciality: 'evolution0',
}
export default glandignon
