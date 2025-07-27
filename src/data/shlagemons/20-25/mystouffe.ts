import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import orchibre from '../evolutions/orchibre'

export const mystouffe: BaseShlagemon = {
  id: 'mystouffe',
  name: 'Mystouffe',
  description: `Mystouffe est un Shlagémon recouvert d'une touffe si vaste, si dense, si touffue, qu’on ne sait plus vraiment où il commence ni où il finit. Sa pilosité semble dotée d’une vie propre, frémissant au moindre courant d’air, et émettant parfois des sons de sac plastique.

Il vit tapi dans les coins d’appartements insalubres, entre les coussins éventrés et les tas de linge humide. Des rumeurs disent qu’il abrite dans sa touffe des créatures plus petites… voire d'autres Mystouffes.

Il déteste l’eau, les peignes, et les remarques sur son hygiène. Il attaque en agitant frénétiquement sa toison, libérant des spores poisseux et des poils électrostatiques.

Son attaque *Pollen de Touffe* est connue pour déclencher des crises d’éternuements en chaîne chez les dresseurs non préparés. On dit qu’un Mystouffe particulièrement touffu aurait un jour étouffé un aspirateur industriel.

Sa touffe le protège des coups directs, mais le rend lent et imprévisible. Son regard reste un mystère : personne ne l’a jamais vu sous les poils.`,
  descriptionKey: 'data.shlagemons.20-25.mystouffe.description',

  types: [shlagemonTypes.plante, shlagemonTypes.poison],
  evolution: {
    base: orchibre,
    condition: {
      type: 'lvl',
      value: 62,
    },
  },
}

export default mystouffe
