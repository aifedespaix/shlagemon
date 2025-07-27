import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const MAGMARETFRED_DESCRIPTION = 'magmaretfred.description'

export const magmaretfred: BaseShlagemon = {
  id: 'magmaretfred',
  name: 'Magmar&Fred',
  description: MAGMARETFRED_DESCRIPTION,
  descriptionKey: 'data.shlagemons.95-99.magmaretfred.description',
  types: [shlagemonTypes.feu],
}

export default magmaretfred
