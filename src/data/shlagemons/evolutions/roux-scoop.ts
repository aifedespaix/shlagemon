import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import { rouxPignolage } from './roux-pignolage'

export const rouxScoop: BaseShlagemon = {
  id: 'roux-scoop',
  name: 'Roux Scoop',
  description: `Roux Scoop a troqué sa guitare et ses illusions contre un vieil appareil photo rafistolé à base de chewing-gum et de sparadrap. Il virevolte dans les cieux en quête de scoops minables : disputes entre Pokémon, culottes envolées, ou encore la forme suspecte d’un nuage. Avec sa casquette trop grande estampillée "PRESSÉ", il se prend pour le roi du journalisme d’investigation, même s’il ne fait que spammer des clichés flous et des rumeurs non vérifiées sur les forums de PokéComplot. Il parle vite, renifle fort, et ponctue ses phrases de "j’ai mes sources". Son attaque signature, *Flash Infâme*, aveugle tous les adversaires, mais il oublie souvent de retirer le cache de l’objectif. Malgré ses ambitions, il reste désespérément à la recherche d’un vrai sujet... ou d’un peu de respect.`,
  types: [shlagemonTypes.normal, shlagemonTypes.vol],
  coefficient: 20,
  evolution: { base: rouxPignolage, condition: { type: 'lvl', value: 36 } },
}

export default rouxScoop
