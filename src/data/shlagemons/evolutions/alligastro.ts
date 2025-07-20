import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const alligastro: BaseShlagemon = {
  id: 'alligastro',
  name: 'Alligastro',
  description: `Géant torse nu avec une gueule de travers. Pue la bière et le vomi, et vomit la bière. Parle que en borborygmes.`,
  types: [shlagemonTypes.eau],
  coefficient: 96,
}

export default alligastro
