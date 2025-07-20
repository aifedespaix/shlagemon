import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const qwiflouch: BaseShlagemon = {
  id: 'qwiflouch',
  name: 'Qwiflouch',
  description: `Enflé comme une boule à mites, recouvert de pics rouillés. Il lâche du gaz au moindre stress et fait fuir les autres Shlagémons.`,
  types: [shlagemonTypes.eau, shlagemonTypes.poison],
  coefficient: 83,
}

export default qwiflouch
