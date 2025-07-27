import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const triopikouze: BaseShlagemon = {
  id: 'triopikouze',
  name: 'Triopikouze',
  description: `Triopikouze est ce qu'on appelle dans le jargon un "incident ambulant". Radié de l’ordre des médecins pour raisons évidentes (et nombreuses), il a trouvé un nouveau terrain de jeu : les soirées crades et les rave-parties en sous-sol. Là où d'autres apportent de la bonne humeur, lui apporte... des piqûres surprises.

Composé de trois têtes aux regards fuyants, il discute souvent avec lui-même pour se mettre d’accord sur *qui on va piquer ce soir*. Chacune de ses têtes possède une seringue différente, contenant un liquide aux effets mystérieux (hallucinations, évanouissements, envie de danser sur du Jul).

Son attaque signature, *Injection Festive*, inflige un statut aléatoire à tous les ennemis présents. Il peut aussi déclencher *Soirée Non Consentante*, une capacité qui interrompt toutes les actions ennemies pendant un tour, le temps de créer un malaise palpable.`,
  descriptionKey: 'data.shlagemons.evolutions.triopikouze.description',
  types: [shlagemonTypes.poison, shlagemonTypes.spectre],
  speciality: 'evolution1',
}
export default triopikouze
