import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import alakalbar from './alakalbar'

export const kadavrebras: BaseShlagemon = {
  id: 'kadavrebras',
  name: 'data.shlagemons.evolutions.kadavrebras.name',
  description: 'data.shlagemons.evolutions.kadavrebras.description',
  types: [shlagemonTypes.psy],
  evolution: {
    base: alakalbar,
    condition: {
      type: 'lvl',
      value: 95,
    },
  },
  speciality: 'evolution1',
}
export default kadavrebras
