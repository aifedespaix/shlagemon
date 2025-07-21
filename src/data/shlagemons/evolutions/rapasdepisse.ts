import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const rapasdepisse: BaseShlagemon = {
  id: 'rapasdepisse',
  name: 'Rapasdepisse',
  description: `Rapasdepisse est l’évolution tragiquement humide de Piafsansbec. Il a enfin récupéré un peu de plumage, une carrure plus imposante, et même un cri (aigu, inutile, tremblant). Mais tout cela est ruiné par un détail... il fait pipi. Tout le temps. Par petites gouttes. Sans prévenir.

Il n’a aucun contrôle. À chaque battement d’ailes : *plitch*. À chaque cri : *pshht*. À chaque victoire : *floc*. Il porte parfois une sorte de lange improvisé en mousse, mais ça déborde. Toujours. Son passage laisse derrière lui des flaques suspectes et des flaçons d’humiliation. Sa zone de spawn est officiellement déclarée "glissante".

Son attaque signature, *Jet Honteux*, inflige un malus de défense à l’ennemi (et de respect à lui-même). Il possède aussi *Fuite Incontrôlée*, une attaque passive qui inflige des dégâts mineurs à chaque tour... au sol uniquement. Il peut aussi apprendre *Averse Doublée*, qui remplace les effets de météo par quelque chose de bien plus personnel.

Rapasdepisse ne vole pas vraiment. Il fait des sauts nerveux et humides. Son cri ressemble à un "PRRRFFFFFT !" suivi d’un long silence gênant. Il évite les zones aérées et les dresseurs trop propres.

On le garde par compassion, ou par erreur. Mais même s’il fait un peu pitié, certains affirment qu’il est doux, affectueux... et toujours tiède.`,
  descriptionKey: 'data.shlagemons.evolutions.rapasdepisse.description',
  types: [shlagemonTypes.vol],
  coefficient: 60,
}

export default rapasdepisse
