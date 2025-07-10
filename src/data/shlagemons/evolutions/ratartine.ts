import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const ratartine: BaseShlagemon = {
  id: 'ratartine',
  name: 'Ratartine',
  description: `Ratartine est l’évolution tartinée de Ratonton. Après avoir trop siesté au soleil avec du pâté dans les poches, son corps a fusionné avec une immense tranche de pain de mie moisi. Sa fourrure est désormais dorée sur les bords, et son dos arbore en permanence une couche de rillettes, de confiture, ou parfois de sauce inconnue (selon la météo et son humeur digestive).

Il se déplace lentement, en émettant des bruits de croûte qui frotte sur le carrelage. Il est obsédé par les tartines, au point de tenter de tartiner tout ce qui passe : murs, ennemis, alliés, sol, air. Son attaque signature, *Écrasé Beurré*, inflige des dégâts collants et ralentit la cible en lui projetant une couche grasse et tiède.

Ratartine vit dans les placards, dort dans les grille-pains abandonnés, et rêve de se faire toaster par amour. Il pense que les ronds de gras sur la nappe sont des portails magiques. Sa capacité passive, *Pain Perdu*, lui permet de regagner des PV lorsqu’il est proche d’un pique-nique.

On dit qu’il a tenté d’évoluer en "Croquemonsieur", mais qu’il a trop fondu avant la dernière étape.`,
  types: [shlagemonTypes.normal],
  coefficient: 45,
}

export default ratartine
