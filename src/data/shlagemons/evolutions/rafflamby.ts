import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const rafflamby: BaseShlagemon = {
  id: 'rafflamby',
  name: 'Rafflamby',
  description: `Rafflamby est une imposante fleur fongique au dôme tremblotant, dont la texture évoque irrésistiblement un Flamby oublié sur un radiateur. Sa corolle charnue vibre au moindre pas, et libère des effluves de caramel tourné mêlé à des relents de compost diplomatique.

On le trouve souvent avachi au centre de clairières suintantes, là où la gravité semble plus molle qu'ailleurs. Certains dresseurs affirment qu’il bouge lentement, mais qu’il finit toujours par apparaître à la fin, d’un air penaud mais inévitable.

Son attaque *Coulée Présidentielle* projette une flaque gluante et tiède, difficile à éviter et encore plus difficile à justifier. Lorsqu’il subit une défaite, il se contente de sourire doucement, comme s’il l’avait prévue depuis le début.

Rafflamby n’évolue plus, mais reste malgré tout présent dans de nombreux débats. Certains experts affirment qu’il n’est ni aimé, ni détesté : il est simplement là, fidèle à lui-même, tremblotant mais constant.`,

  types: [shlagemonTypes.plante, shlagemonTypes.poison],
  coefficient: 90,
}

export default rafflamby
