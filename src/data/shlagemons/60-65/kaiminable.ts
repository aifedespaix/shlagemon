import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import croconaze from '../evolutions/croconaze'

export const kaiminable: BaseShlagemon = {
  id: 'kaiminable',
  name: 'Kaiminable',
  description: `Petit croco tout bouffi, baveux, qui mord ses propres doigts. A déjà une canette vide accrochée à la queue.`,
  descriptionKey: 'data.shlagemons.60-65.kaiminable.description',
  types: [shlagemonTypes.eau],
  evolution: {
    base: croconaze,
    condition: { type: 'lvl', value: 78 },
  },
  speciality: 'evolution0',
}
export default kaiminable
