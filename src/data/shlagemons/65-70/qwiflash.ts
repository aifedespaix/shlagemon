import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import qwiflouch from '../evolutions/qwiflouch'

export const qwiflash: BaseShlagemon = {
  id: 'qwiflash',
  name: 'Qwiflash',
  description: `Poisson gonflé, mais tout mollasson, flotte à moitié crevé dans les caniveaux. Tire la langue, sans raison.`,
  descriptionKey: 'data.shlagemons.65-70.qwiflash.description',
  types: [shlagemonTypes.eau, shlagemonTypes.poison],
  coefficient: 68,
  evolutions: [{
    base: qwiflouch,
    condition: { type: 'lvl', value: 82 },
  }],
}

export default qwiflash
