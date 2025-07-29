import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import dartagnan from './dartagnan'

export const coconnul: BaseShlagemon = {
  id: 'coconnul',
  name: 'Coconnul',
  evolution: {
    base: dartagnan,
    condition: {
      type: 'lvl',
      value: 25,
    },
  },
  description: 'data.shlagemons.evolutions.coconnul.description',
  types: [shlagemonTypes.insecte],
  speciality: 'evolution1',
}
export default coconnul
