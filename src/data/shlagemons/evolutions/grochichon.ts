import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const grochichon: BaseShlagemon = {
  id: 'grochichon',
  name: 'Grochichon',
  description: `Grochichon est l’évolution fumeuse de Rondonichon, littéralement. Il passe ses journées vautré dans un hamac improvisé avec des slips oubliés, en marmonnant des phrases sans queue ni tête du genre “le cosmos, c’est dans la racine du chichon intérieur”.

Son haleine dense et poivrée suffit à endormir les Pokémon psy à 20 mètres, tandis que sa peau rosâtre tire désormais vers le gris-beige-jaune-douteux. Une brume l’accompagne partout, mélange d’encens moisi, de kebab froid et d’interrogations métaphysiques.

Grochichon ne marche plus : il flotte à dix centimètres du sol, uniquement quand il plane assez fort. Il attaque avec *Halène Putassique*, qui colle à l’âme, et *Bulle Mentale*, un projectile mou et chaud à base de pensées ralenties.

On ne sait pas vraiment s’il combat, ou s’il est juste là pour poser une ambiance. Son cri ressemble à un “pfffft” suivi d’un éclat de rire essoufflé. Les experts en Shlagologie recommandent de ne jamais le déranger après 16h : “il redescend”.

On ignore s’il a une évolution. Certains parlent d’un “Tontonchichon” tapi dans une cave…`,
  descriptionKey: 'data.shlagemons.evolutions.grochichon.description',

  types: [shlagemonTypes.normal, shlagemonTypes.poison],
}

export default grochichon
