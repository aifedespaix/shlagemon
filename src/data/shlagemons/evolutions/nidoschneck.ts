import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import nidoqueer from './nidoqueer'

export const nidoschneck: BaseShlagemon = {
  id: 'nidoschneck',
  name: 'Nidoschneck',
  description: `Nidoschneck est un·e Shlagémon·e à l’énergie débordante… mais toujours mal canalisée. Iel parle fort, rit en majuscules et ponctue toutes ses phrases par "tu vois c’que j’veux dire ou pas ?" Sa passion ? Les foufounes. La sienne, celles des autres, les concepts liés, les tatouages approximatifs sur le bas-ventre. Iel collectionne les selfies flous et les stories inutiles, toujours tourné·e à contre-jour.

Son attaque signature *Frappe de Schnek* est moins puissante qu’iel en a l’air, mais elle fait toujours son petit effet dans les zones sauvages. En combat, iel aime provoquer ses adversaires avec *Cris Gênants*, ce qui inflige l’état **Malaise Profond** à tout le monde autour, alliés inclus.

Iel s’entoure souvent de Nidononbinaire♀ ou d’autres Shlagémons influençables, qu’iel appelle ses “sœurs de la teucha”. On ne sait jamais si iel est sérieux·se ou si iel trolle. Probablement les deux.`,
  descriptionKey: 'data.shlagemons.evolutions.nidoschneck.description',
  types: [shlagemonTypes.poison],
  coefficient: 66,

  evolutions: [{
    base: nidoqueer,
    condition: {
      type: 'lvl',
      value: 88,
    },
  }],
}

export default nidoschneck
