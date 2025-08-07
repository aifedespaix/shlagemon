import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import empifouette from './empifouette'

export const boustiflemme: BaseShlagemon = {
  id: 'boustiflemme',
  name: 'data.shlagemons.evolutions.boustiflemme.name',
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
