import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import qwiflouch from '../evolutions/qwiflouch'

export const qwiflash: BaseShlagemon = {
  id: 'qwiflash',
  name: 'Qwiflash',
  description: 'data.shlagemons.65-70.qwiflash.description',
  types: [shlagemonTypes.eau, shlagemonTypes.poison],
  evolution: {
    base: qwiflouch,
    condition: { type: 'lvl', value: 82 },
  },
  speciality: 'evolution0',
}
export default qwiflash
