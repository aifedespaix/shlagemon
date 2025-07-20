import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import alligastro from './alligastro'

export const croconaze: BaseShlagemon = {
  id: 'croconaze',
  name: 'Croconaze',
  description: `Il porte une veste en cuir moisi, fait le caïd dans les parkings, mais a des dents en plastique.`,
  types: [shlagemonTypes.eau, shlagemonTypes.combat],
  coefficient: 78,
  evolution: {
    base: alligastro,
    condition: { type: 'lvl', value: 92 },
  },
}

export default croconaze
