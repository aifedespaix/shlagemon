import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const alligastro: BaseShlagemon = {
  id: 'alligastro',
  name: 'Alligastro',
  description: `Géant torse nu avec une gueule de travers. Pue la bière et le vomi, et vomit la bière. Parle que en borborygmes.`,
  descriptionKey: 'data.shlagemons.evolutions.alligastro.description',
  types: [shlagemonTypes.eau],
}

export default alligastro
