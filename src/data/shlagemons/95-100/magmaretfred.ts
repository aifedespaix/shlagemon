import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const MAGMARETFRED_DESCRIPTION = 'magmaretfred.description'

export const magmaretfred: BaseShlagemon = {
  id: 'magmaretfred',
  name: 'Magmar&Fred',
  description: MAGMARETFRED_DESCRIPTION,
  types: [shlagemonTypes.feu],
  coefficient: 96,
}

export default magmaretfred
