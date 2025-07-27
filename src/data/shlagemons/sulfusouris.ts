import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const sulfusouris: BaseShlagemon = {
  id: 'sulfusouris',
  name: 'Sulfusouris',
  description: `Sulfusouris est un Shlagémon légendaire né d’un court-circuit dans un four à micro-ondes abandonné. Selon la légende, une colonie de souris aurait tenté de construire un nid dans un grille-pain, et seule l’une d’entre elles aurait survécu… carbonisée, mais éveillée à une puissance ardente. Elle s’est relevée dans les flammes, plus déterminée que jamais à griller tout ce qui bouge — surtout les câbles électriques.

Avec son pelage en poils roussis, ses ailes faites de tranches de pain de mie calcinées et sa queue qui crache des étincelles, Sulfusouris est la terreur des parkings souterrains et des compteurs Linky. Il émet un grincement aigu quand il vole, comme un cri de modem mourant. Son odeur évoque un mélange de plastique fondu et de fromage râpé oublié dans une voiture en plein été.

Certains shlagémonologues affirment qu’il est capable de déclencher des incendies spontanés juste en éternuant, et qu’il s’abreuve exclusivement de Red Bull tiède pour alimenter ses flammes internes. D'autres disent qu’il aurait essayé de rejoindre le ciel comme un phénix… mais s’est arrêté à mi-hauteur pour fumer une clope sur un lampadaire.

Vénéré par une secte de rats crasseux, Sulfusouris est considéré comme le “Dieu du Barbecue Éternel”. Il apparaît parfois lors des canicules extrêmes, planant en sueur au-dessus des toits, et beuglant des prophéties incompréhensibles en clignotant comme une veilleuse cassée.`,
  descriptionKey: 'data.shlagemons.sulfusouris.description',

  types: [shlagemonTypes.feu, shlagemonTypes.vol],
  speciality: 'legendary',
}

export default sulfusouris
