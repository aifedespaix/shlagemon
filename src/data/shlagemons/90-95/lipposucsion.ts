import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const lipposucsion: BaseShlagemon = {
  id: 'lipposucsion',
  name: 'Lipposucsion',
  description: `Après une liposuccion ratée, ce Shlagémon a la peau toute fripée et un tempérament glacial. Il embrasse ses ennemis pour les geler sur place avant de se plaindre de ses kilos en trop.`,
  types: [shlagemonTypes.glace, shlagemonTypes.psy],
  coefficient: 93,
}

export default lipposucsion
