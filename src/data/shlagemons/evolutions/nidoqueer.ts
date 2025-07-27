import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const nidoqueer: BaseShlagemon = {
  id: 'nidoqueer',
  name: 'Nidoqueer',
  description: `Nidoqueer, c’est la Queen — dans tous les sens du terme. Iel a troqué l’armure classique contre une cuirasse pailletée et assume chaque couleur de son spectre avec dignité. Connu·e pour son cri de guerre "YES SHLAG!", iel ne cherche pas à dominer, mais à rayonner.

Son attaque signature *Marche de la Fierté* lui permet de traverser n’importe quelle zone sans être interrompu·e, tout en boostant le moral de ses alliés. Iel manie aussi *Pluie de Paillettes*, une capacité de zone peu douloureuse mais extrêmement humiliante pour l’adversaire.

Nidoqueer est un pilier des zones communautaires de Shlagémon, toujours là pour défendre les plus petit·e·s, corriger les propos déplacés avec élégance, et lâcher un *wink* bien placé. On reconnaît Nidoqueer à ses épines colorées, son regard fardé et sa démarche impeccable. Iel n'est pas là pour se battre... mais si iel le fait, ce sera avec **panache**.`,
  descriptionKey: 'data.shlagemons.evolutions.nidoqueer.description',
  types: [shlagemonTypes.poison],
}

export default nidoqueer
