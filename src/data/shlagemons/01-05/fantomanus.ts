import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import sperectum from '../evolutions/sperectum'

export const fantomanus: BaseShlagemon = {
  id: 'fantomanus',
  name: 'data.shlagemons.01-05.fantomanus.name',
  description: 'data.shlagemons.01-05.fantomanus.description',
  types: [shlagemonTypes.spectre, shlagemonTypes.poison],
  evolution: {
    base: sperectum,
    condition: {
      type: 'lvl',
      value: 22,
    },
  },
  speciality: 'evolution0',
}
export default fantomanus
