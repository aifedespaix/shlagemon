import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const nidoschneck: BaseShlagemon = {
  id: 'nidoschneck',
  name: 'Nidoschneck',
  description: `Nidoschneck est une Shlagémone à l’énergie débordante… mais toujours mal canalisée. Elle parle fort, rit en majuscules et ponctue toutes ses phrases par "tu vois c’que j’veux dire ou pas ?" Sa passion ? Les foufounes. La sienne, celles des autres, les concepts liés, les tatouages approximatifs sur le bas-ventre. Elle collectionne les selfies flous et les stories inutiles, toujours tournée à contre-jour.

Son attaque signature *Frappe de Schnek* est moins puissante qu’elle en a l’air, mais elle fait toujours son petit effet dans les zones sauvages. En combat, elle aime provoquer ses adversaires avec *Cris Gênants*, ce qui inflige l’état **Malaise Profond** à tout le monde autour, alliés inclus.
    
Elle s’entoure souvent de Nidononbinaire♀ ou d’autres Shlagémons influençables, qu’elle appelle ses “sœurs de la teucha”. On ne sait jamais si elle est sérieuse ou si elle trolle. Probablement les deux.`,
  types: [shlagemonTypes.poison],
  coefficient: 66,
}

export default nidoschneck
