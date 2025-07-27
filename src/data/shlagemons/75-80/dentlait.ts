import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import hosoltueur from '../evolutions/hosoltueur'

export const DENTLAIT_DESCRIPTION = 'dentlait.description'

export const dentlait: BaseShlagemon = {
  id: 'dentlait',
  name: 'Dentlait',
  description: DENTLAIT_DESCRIPTION,
  descriptionKey: 'data.shlagemons.75-80.dentlait.description',
  types: [shlagemonTypes.sol],
  evolution: {
    base: hosoltueur,
    condition: { type: 'lvl', value: 83 },
  },
}

export default dentlait
