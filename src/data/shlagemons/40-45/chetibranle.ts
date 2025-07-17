import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import boustiflemme from '../evolutions/boustiflemme'

export const chetibranle: BaseShlagemon = {
  id: 'chetibranle',
  name: 'Chétibranle',
  description: `Chétibranle est un Shlagémon réputé pour sa capacité à s’occuper de lui-même avec une assiduité déconcertante. Amateur de plaisirs discrets, il aime s’isoler dans des coins humides pour se consacrer à l’art d’absorber tout ce qui passe à portée de sa tige. Certains chercheurs affirment qu’il est capable d’aspirer la moindre goutte d’énergie ambiante, ne laissant rien lui échapper, même dans les moments les plus solitaires.

Sa technique favorite, *Pompage Introspectif*, consiste à canaliser toutes ses forces vers l’intérieur pour un plaisir personnel rarement égalé dans la faune des shlagémons. D’aucuns racontent qu’après ses longues séances d’absorption, il semble toujours un peu vidé, mais paradoxalement plus rayonnant que jamais.

On ne sait jamais vraiment ce qu’il absorbe, ni ce qu’il fait pousser, mais il laisse toujours derrière lui une étrange atmosphère… moite et contemplative.`,
  types: [shlagemonTypes.plante, shlagemonTypes.poison],
  coefficient: 42,
  evolution: {
    base: boustiflemme,
    condition: {
      type: 'lvl',
      value: 48,
    },
  },
}

export default chetibranle
