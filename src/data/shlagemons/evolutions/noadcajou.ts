import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const noadcajou: BaseShlagemon = {
  id: 'noadcajou',
  name: 'Noadcajou',
  description: `Cet arbre sur pattes produit des noix de cajou grillées à chaque attaque. Il préfère le climat tropical et se moque des régimes alimentaires de ses adversaires.`,
  descriptionKey: 'data.shlagemons.evolutions.noadcajou.description',
  types: [shlagemonTypes.plante, shlagemonTypes.psy],
  coefficient: 84,
}

export default noadcajou
