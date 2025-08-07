import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import noadcajou from '../evolutions/noadcajou'

export const huithuit: BaseShlagemon = {
  id: 'huithuit',
  name: 'data.shlagemons.75-80.huithuit.name',
  description: 'data.shlagemons.75-80.huithuit.description',
  types: [shlagemonTypes.plante, shlagemonTypes.psy],
  evolution: {
    base: noadcajou,
    condition: { type: 'lvl', value: 82 },
  },
  speciality: 'evolution0',
}
export default huithuit
