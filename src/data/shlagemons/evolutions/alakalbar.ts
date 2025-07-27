import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const alakalbar: BaseShlagemon = {
  id: 'alakalbar',
  name: 'Alakalbar',
  description: `Considéré comme un sage dans son quartier... du moins par lui-même. Il prétend maîtriser les arts mystiques du *Contrôle du Destin* mais confond souvent télékinésie et procrastination. On le reconnaît à ses deux grosses cuillères de cantine, tordues à force de remuer du thé aux herbes chelou dans des bouteilles de soda. Vêtu d’une djellaba délavée et d’un regard qui voit à travers toi (mais pas très loin), il marmonne des incantations approximatives pendant qu’il fait tourner sa sacoche à bandoulière en plastique doré. Il prétend méditer, mais il dort à 80%. Sa capacité spéciale, *Chakra Perimé*, déséquilibre l’ennemi avec une odeur de patchouli acide et une attaque psychique floue. Il peut aussi invoquer son attaque signature, *Projection Spirituelle*, qui consiste à lancer une cuillère sur son adversaire en hurlant “vision sacrée !” sans grand effet. On le croise souvent assis sur un banc, seul, en train de discuter avec ses propres Pokéball vides.`,
  descriptionKey: 'data.shlagemons.evolutions.alakalbar.description',
  types: [shlagemonTypes.psy],
  speciality: 'evolution2',
}
export default alakalbar
