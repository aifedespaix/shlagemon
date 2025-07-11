import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import rafflamby from './rafflamby'

export const orchibre: BaseShlagemon = {
  id: 'orchibre',
  name: 'Orchibre',
  description: `Orchibre est l’évolution majestueuse — mais pas moins grotesque — du Chibre. Sa tige centrale, épaisse et charnue, s’élève fièrement d’une corolle d’orchidée aux couleurs criardes, éclatant comme un feu d’artifice dans une serre mal entretenue.

On le trouve souvent dans des recoins humides, méditant au son des gouttes qui tombent sur du carrelage moisi. Lorsqu’il se sent menacé, il libère un nuage de pollen épais et entêtant, déclenchant toux, larmes et parfois même hallucinations florales.

Son attaque signature, *Fleur du Mal Alpha*, projette une salve de pétales coupants chargés en testostérone volatile. Certains chercheurs pensent qu’Orchibre serait le chaînon manquant entre les plantes vertes et les darons en claquettes-chaussettes.

Il n’évolue plus, car selon la légende : “Quand un chibre atteint la floraison, il n’a plus rien à prouver.”`,

  types: [shlagemonTypes.plante, shlagemonTypes.poison],
  coefficient: 62,
  evolution: {
    base: rafflamby,
    condition: {
      type: 'lvl',
      value: 90,
    },
  },
}

export default orchibre
