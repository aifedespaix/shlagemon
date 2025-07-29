import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import empifouette from './empifouette'

export const boustiflemme: BaseShlagemon = {
  id: 'boustiflemme',
  name: 'Boustiflemme',
  description: 'data.shlagemons.evolutions.boustiflemme.description',
  types: [shlagemonTypes.normal],
  evolution: {
    base: empifouette,
    condition: {
      type: 'lvl',
      value: 62,
    },
  },
  speciality: 'evolution1',
}
export default boustiflemme
