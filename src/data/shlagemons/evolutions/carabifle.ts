import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import tordturc from './tord-turc'

export const carabifle: BaseShlagemon = {
  id: 'carabifle',
  name: 'Carabifle',
  description: `Carabifle est l’évolution logique — mais pas forcément souhaitable — de Carapouffe. Sa carapace moelleuse est devenue un trône de plastique rose fluo incrusté de miroirs cassés et de pinceaux de maquillage fossilisés. Elle ne roule plus, elle *glisse* avec une grâce douteuse, laissant une traînée collante parfum pamplemousse-suédois.

Sa voix est désormais autotunée en permanence, et sa nouvelle attaque signature, *Cataclysme Glossy*, étale une couche de gloss tellement épaisse qu’elle bloque les mouvements ennemis pendant 3 tours. Son chignon est maintenant vivant, et attaque tout seul dès qu’on prononce le mot “naturel”.

Carabifle possède aussi un éventail en acrylique qui lui permet de s’éventer avec violence tout en jugeant les autres. Sa moustache fine dessinée au crayon waterproof est redoutable et augmente son charisme de +12 contre les mâles en rut.

On dit que si l’on regarde ses cils pailletés trop longtemps, on devient influenceur bien-être sans s’en rendre compte.`,
  descriptionKey: 'data.shlagemons.evolutions.carabifle.description',
  types: [shlagemonTypes.eau],
  evolution: { base: tordturc, condition: { type: 'lvl', value: 36 } },
  speciality: 'evolution1',
}
export default carabifle
