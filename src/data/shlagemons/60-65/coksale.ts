import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import coksnif from '../evolutions/coksnif'

export const coksale: BaseShlagemon = {
  id: 'coksale',
  name: 'Coksale',
  description: `Une coccinelle de cité, toujours perchée sur un mégot. Deux yeux globuleux et des ailes qui puent le tabac froid.`,
  descriptionKey: 'data.shlagemons.60-65.coksale.description',
  types: [shlagemonTypes.insecte, shlagemonTypes.poison],
  coefficient: 61,
  evolutions: [{
    base: coksnif,
    condition: { type: 'lvl', value: 75 },
  }],
}

export default coksale
