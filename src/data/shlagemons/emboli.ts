import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const emboli: BaseShlagemon = {
  id: 'emboli',
  name: 'Emboli',
  description: `Emboli est survenue après un long séjour dans une cave mal ventilée. Son pelage sent le tabac froid et la lassitude, et il émet en permanence de petites volutes grisâtres, sans raison apparente. Il ne se bat presque jamais. Il souffle. Lourdement. S’il attaque, c’est généralement par accident, ou parce qu’on lui a demandé trop fort. Son attaque signature, Soupir Toxique, inflige des dégâts progressifs à l’adversaire et peut provoquer l’état Démotivation. En combat, il préfère s’asseoir et regarder les autres se battre. Il est surtout là "pour l’ambiance".`,
  types: [shlagemonTypes.poison],
  coefficient: 15,
}

export default emboli
