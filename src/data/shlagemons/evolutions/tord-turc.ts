import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const tordturc: BaseShlagemon = {
  id: 'tord-turc',
  name: 'Tord Turc',
  description: `Tord Turc est l’évolution ultime de la lignée Carapouffe. Il ne se déplace plus : il glisse latéralement, lentement, tout en tordant l’espace autour de lui. Sa simple présence froisse les meubles, plie les murs et recourbe les opinions.

Armé de deux bras aux ongles vissés façon tire-bouchon, il peut littéralement tordre les attaques ennemies pour les renvoyer à l’expéditeur, accompagnées d’un soupir condescendant. Il parle peu, mais quand il le fait, c’est pour demander “c’est qui ce fragile ?” ou annoncer qu’il a “tordu l’univers pour trouver une teinte de gloss inédite”.

Son dos est devenu un trône en spirale, incrusté de miroirs concaves qui renvoient à leurs adversaires une version déformée et déprimante d’eux-mêmes. Sa technique ultime, *Torsion Charismatique*, plie les statistiques ennemies jusqu’à ce qu’ils s’abandonnent au désespoir.

On dit que même les légendaires évitent de le croiser : pas par peur de la défaite, mais par peur de se faire juger en silence.`,
  descriptionKey: 'data.shlagemons.evolutions.tord-turc.description',
  types: [shlagemonTypes.eau],
  speciality: 'unique',
}
export default tordturc
