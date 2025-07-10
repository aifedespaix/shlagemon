import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const nidononbinaireF: BaseShlagemon = {
  id: 'nidononbinaire-f',
  name: 'Nidononbinaire♀',
  description: `Nidononbinaire♀ a des cornes molles, un regard fixe, et une passion pour les plantes en plastique. Elle n’est pas vraiment là pour se battre, mais elle viendra quand même, avec ses fiches, son tote bag et une vibe étrange.

Elle utilise souvent *Postillonnage Toxique*, une attaque à faible portée mais dont les effets durent étonnamment longtemps. Elle s’entend très bien avec les autres Shlagémons, surtout les moins bavards. En zone sauvage, elle se poste près des bancs et observe… longtemps. Peut-être trop longtemps.`,
  types: [shlagemonTypes.poison],
  coefficient: 34,
}

export default nidononbinaireF
