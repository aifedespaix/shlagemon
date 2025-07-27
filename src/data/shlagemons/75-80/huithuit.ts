import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import noadcajou from '../evolutions/noadcajou'

export const huithuit: BaseShlagemon = {
  id: 'huithuit',
  name: 'Huithuit',
  description: `Formé de deux chiffres huit tout collés, Huithuit adore faire des blagues sur les œufs. Il se dandine maladroitement et déclenche parfois des visions psychédéliques chez ceux qui le regardent trop longtemps.`,
  descriptionKey: 'data.shlagemons.75-80.huithuit.description',
  types: [shlagemonTypes.plante, shlagemonTypes.psy],
  evolution: {
    base: noadcajou,
    condition: { type: 'lvl', value: 82 },
  },
  speciality: 'evolution0',
}
export default huithuit
