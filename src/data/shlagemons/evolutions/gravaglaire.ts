import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import grosseflemme from './grosseflemme'

export const gravaglaire: BaseShlagemon = {
  id: 'gravaglaire',
  name: 'Gravaglaire',
  description: 'data.shlagemons.evolutions.gravaglaire.description',
  types: [shlagemonTypes.roche, shlagemonTypes.sol],
  evolution: {
    base: grosseflemme,
    condition: {
      type: 'lvl',
      value: 89,
    },
  },
  speciality: 'evolution1',
}
export default gravaglaire
