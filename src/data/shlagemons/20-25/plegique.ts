import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import parasecte from '../evolutions/parasecte'

export const plegique: BaseShlagemon = {
  id: 'plegique',
  name: 'Plégique',
  description: `Plégique est un ancien Paras qui a mal tourné lors d’une chute de compost. Depuis, il est paraplégique — ses deux pattes arrière ne répondent plus, figées dans une position étrange qu’il appelle "le yoga du sol". Mais loin de se laisser abattre, il rampe avec la dignité d’un ver de calcaire, traînant derrière lui une traînée de spores et de miettes de pain détrempées.

Ses champignons, devenus trop lourds, l’obligent à se déplacer en roulant sur le côté ou en se laissant glisser sur des cartons imbibés. Il a bricolé une sorte d’exosquelette en canettes vides et morceaux de Tupperware, mais il oublie souvent comment ça s’attache.

Plégique communique avec des cliquetis de mandibules et des phrases absconses du genre "le sol m’a choisi". Il est convaincu que sa condition est un avantage évolutif, car "plus bas que terre, y’a que la vérité".

Son attaque *Spore Rampante* endort l’ennemi en libérant un sifflement humide au ras du sol, tandis que *Myco-Suceur*, sa capacité signature, draine lentement la vie des ennemis... et un peu la tienne aussi, émotionnellement.

Il vit dans des zones Wi-Fi oubliées, collé contre des murs suintants. On dit qu’il peut survivre plusieurs jours sans bouger, simplement en absorbant l’humidité ambiante et des pensées négatives. Un vrai survivant… à sa manière.`,
  types: [shlagemonTypes.insecte, shlagemonTypes.poison],
  coefficient: 24,
  evolution: {
    base: parasecte,
    condition: {
      type: 'lvl',
      value: 45,
    },
  },
}

export default plegique
