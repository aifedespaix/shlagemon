import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import sperectum from '../evolutions/sperectum'

export const fantomanus: BaseShlagemon = {
  id: 'fantomanus',
  name: 'Fantomanus',
  description: `Fantomanus est littéralement un esprit… de fesses. Son corps flotte dans l’air, entouré d’un brouillard violet bien douteux, avec des traces et des auréoles un peu partout. Là où les autres Shlagémons ont une bouche, lui, c’est un vrai trou de balle — au sens propre. Il communique en faisant des bruits bizarres et des pets spectraux, tout en laissant planer une odeur indescriptible.

Il adore apparaître dans les toilettes publiques, les vestiaires de gymnase ou les canapés douteux, juste pour le plaisir de foutre la gêne. Sa spécialité : l’attaque *Gaz Spectro-Anal*, un souffle surnaturel par son orifice central, qui hante l’âme et les narines pour toujours.

On raconte qu’il rêve d’atteindre la perfection du prout astral, mais il galère à viser droit, même dans l’au-delà.`,
  descriptionKey: 'data.shlagemons.01-05.fantomanus.description',
  types: [shlagemonTypes.spectre, shlagemonTypes.poison],
  evolution: {
    base: sperectum,
    condition: {
      type: 'lvl',
      value: 22,
    },
  },
  speciality: 'evolution0',
}
export default fantomanus
