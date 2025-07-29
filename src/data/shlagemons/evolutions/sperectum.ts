import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import ectroudbal from './ectroudbal'

export const sperectum: BaseShlagemon = {
  id: 'sperectum',
  name: 'Sperectum',
  description: 'data.shlagemons.evolutions.sperectum.description',
  types: [shlagemonTypes.spectre],
  evolution: {
    base: ectroudbal,
    condition: {
      type: 'lvl',
      value: 52,
    },
  },
  speciality: 'evolution1',
}
export default sperectum
