import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const floripute: BaseShlagemon = {
  id: 'floripute',
  name: 'Floripute',
  description: `Floripute prétend être une plante rare capable de purifier les âmes — alors qu’elle pue littéralement la bougie au patchouli frelatée. Recouverte de feuilles grasses en forme de soutien-gorge floral, elle s'étale lascivement sous le soleil, attendant que des dresseurs "ouverts d’esprit" viennent lui parler d’astrologie et de pierres de chakra.
  
Elle tire ses pouvoirs d’un potager qu’elle cultive sur son dos, mélange douteux de mauvaises herbes, de tomates cerises et de substances interdites dans 4 régions de la Ligue. Son attaque signature, *Infusion Ancestrale*, consiste à t’arroser de tisane brûlante au CBD, ce qui inflige des dégâts mentaux et émotionnels.

On raconte qu’elle peut invoquer des cercles de danse autour d’un feu sacré fait de palettes et de sacs Leclerc. Si elle grogne en récitant des mantras, cours. Elle s’apprête à t’offrir une purification... ou un sandwich au houmous moisi.`,
  types: [shlagemonTypes.plante],
  coefficient: 50,
}

export default floripute
