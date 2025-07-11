import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import vieuxBlaireau from '../evolutions/vieuxblaireau'

export const jeunebelette: BaseShlagemon = {
  id: 'jeunebelette',
  name: 'Jeunebelette',
  description: `Jeunebelette passe ses journées à zoner en jogging dans les terrains vagues, à moitié enterré, les écouteurs plantés dans les oreilles sans musique. Son pelage jauni est rêche et collant, comme un blouson synthétique mal lavé. Il creuse, mais sans réel but, juste pour passer le temps.

Il attaque rarement, sauf s’il sent que "ça parle mal". Sa capacité spéciale *Tacle Banal* inflige des dégâts moyens mais a une chance de provoquer l’état **Flemme Profonde**. En général, Jeunebelette traîne autour des autres Shlagémons pour "voir ce qu’il se passe", sans vraiment participer. Il est là, quoi. 

On raconte qu'il pourrait évoluer s'il trouvait enfin une vraie motivation. Mais c'est pas pour tout de suite.`,
  types: [shlagemonTypes.sol],
  coefficient: 3,
  evolution: {
    base: vieuxBlaireau,
    condition: {
      type: 'lvl',
      value: 5,
    },
  },
}

export default jeunebelette
