import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import coxymort from './coxymort'

export const coksnif: BaseShlagemon = {
  id: 'coksnif',
  name: 'data.shlagemons.evolutions.coksnif.name',
  description: 'data.shlagemons.evolutions.coksnif.description',
  types: [shlagemonTypes.insecte, shlagemonTypes.poison],
  evolution: {
    base: coxymort,
    condition: { type: 'lvl', value: 90 },
  },
  speciality: 'evolution1',
}
export default coksnif
