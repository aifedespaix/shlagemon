import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const nidodragqueen: BaseShlagemon = {
  id: 'nidodragqueen',
  name: 'Nidodragqueen',
  description: `Nidodragqueen est l’icône absolue des arènes urbaines. Couronné·e par le destin et l’eyeliner, ce Shlagémon ne se bat pas pour dominer, mais pour éblouir. Avec sa voix grave qui roule les R et son déhanché de mammouth en talons de 15, Nidodragqueen enchaîne les uppercuts et les punchlines dans un même souffle.

Son attaque signature *Talons de la Mort* inflige des dégâts massifs tout en réduisant le swag de l’adversaire de 3 niveaux. Iel peut aussi lancer *Contour Shocké*, qui désoriente tout adversaire par une entrée spectaculaire et un look irréfutable.

On reconnaît Nidodragqueen à sa corne pailletée, son sceptre cosmique et son cri de guerre : “T'ES PAS PRÊT BÉBÉ 💅”. Iel ? On ne pose pas la question. Nidodragqueen EST. Et c’est bien assez.`,
  descriptionKey: 'data.shlagemons.evolutions.nidodragqueen.description',
  types: [shlagemonTypes.poison],
  coefficient: 88,
}

export default nidodragqueen
