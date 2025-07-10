import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import nidoschneck from '../evolutions/nidoschneck'

export const nidononbinaireF: BaseShlagemon = {
  id: 'nidononbinaire-f',
  name: 'Nidononbinaire♀',
  description: `Nidononbinaire♀ a des cornes molles, un regard fixe, et une passion pour les plantes en plastique. Iel n’est pas vraiment là pour se battre, mais iel viendra quand même, avec ses fiches, son tote bag et une vibe étrange.

Iel utilise souvent *Postillonnage Toxique*, une attaque à faible portée mais dont les effets durent étonnamment longtemps. Iel s’entend très bien avec les autres Shlagémons, surtout les moins bavards. En zone sauvage, iel se poste près des bancs et observe… longtemps. Peut-être trop longtemps.`,
  types: [shlagemonTypes.poison],
  coefficient: 34,
  evolution: {
    base: nidoschneck,
    condition: {
      type: 'lvl',
      value: 66,
    },
  },
}

export default nidononbinaireF
