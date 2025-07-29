import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import coksnif from '../evolutions/coksnif'

export const coksale: BaseShlagemon = {
  id: 'coksale',
  name: 'Coksale',
  description: 'data.shlagemons.60-65.coksale.description',
  types: [shlagemonTypes.insecte, shlagemonTypes.poison],
  evolution: {
    base: coksnif,
    condition: { type: 'lvl', value: 75 },
  },
  speciality: 'evolution0',
}
export default coksale
