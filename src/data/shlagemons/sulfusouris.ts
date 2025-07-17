import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const sulfusouris: BaseShlagemon = {
  id: 'sulfusouris',
  name: 'Sulfusouris',
  description: `Ce volatile enflammé ressemble à une souris qui aurait pris feu. Il laisse des petites braises derrière lui en volant.`,
  types: [shlagemonTypes.feu, shlagemonTypes.vol],
  coefficient: 65,
}

export default sulfusouris
