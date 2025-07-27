import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'
import raptorincel from './evolutions/raptorincel'

export const salamiches: BaseShlagemon = {
  id: 'salamiches',
  name: 'Salamiches',
  description: `Salamiches brûle, mais pas de feu noble, non, plutôt de feu de briquet BIC vide qu’on rallume à la 27ᵉ tentative. Toujours torse nu, même en hiver, il arbore une crête en feu mal fixée et des lunettes de soleil qui fondent partiellement à chaque attaque. Il se nourrit exclusivement de chips au paprika, de whisky bon marché, et d’approbation sociale. On le trouve souvent en train de se filmer en selfie pendant qu’il crache des étincelles sur des poubelles. Sa capacité spéciale, *Feu d’ego*, augmente sa puissance chaque fois qu’il se fait huer. Il envoie des punchlines nulles entre deux jets de flamme molle, et rêve de devenir influenceur muscu alors qu’il n’a que deux abdos (et encore, en ombrage). C’est un être loyal, sauf si on lui propose un kebab gratuit ou une promotion chez Feu Vert.`,
  descriptionKey: 'data.shlagemons.salamiches.description',
  types: [shlagemonTypes.feu],
  evolution: { base: raptorincel, condition: { type: 'lvl', value: 16 } },
  speciality: 'evolution0',
}
export default salamiches
