import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import nidoteub from '../evolutions/nidoteub'

export const nidononbinaireM: BaseShlagemon = {
  id: 'nidononbinaire-m',
  name: 'Nidononbinaire♂',
  description: `Nidononbinaire♂ s’est longtemps cherché. Iel porte des pics mais n’attaque jamais en premier. Iel adore les débats, surtout quand personne n’en veut, et iel commence souvent ses phrases par "techniquement". Iel se déplace avec une démarche hésitante mais bruyante, comme quelqu’un qui n’a pas de destination, mais qui veut quand même qu’on le remarque.

Sa capacité *Point-Virgule* inflige peu de dégâts mais perturbe l’ordre d’attaque adverse en le rendant confus grammaticalement. Iel est souvent vu en train de refaire son look dans les flaques d’eau, persuadé que "l’esthétique, c’est déjà une stratégie".`,
  types: [shlagemonTypes.poison],
  coefficient: 34,
  evolution: {
    base: nidoteub,
    condition: {
      type: 'lvl',
      value: 66,
    },
  },
}

export default nidononbinaireM
