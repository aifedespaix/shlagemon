import type { BaseShlagemon } from '~/type'
import { defibrillator, lighter, pissBottle } from '~/data/items'
import { shlagemonTypes } from '../../shlagemons-type'
import pyrolise from '../evolutions/pyrolise'
import salmoneli from '../evolutions/salmoneli'
import tuberculi from '../evolutions/tuberculi'

export const emboli: BaseShlagemon = {
  id: 'emboli',
  name: 'Emboli',
  description: `Emboli est survenue après un long séjour dans une cave mal ventilée. Son pelage sent le tabac froid et la lassitude, et il émet en permanence de petites volutes grisâtres, sans raison apparente. Il ne se bat presque jamais. Il souffle. Lourdement. S’il attaque, c’est généralement par accident, ou parce qu’on lui a demandé trop fort. Son attaque signature, Soupir Toxique, inflige des dégâts progressifs à l’adversaire et peut provoquer l’état Démotivation. En combat, il préfère s’asseoir et regarder les autres se battre. Il est surtout là "pour l’ambiance".`,
  descriptionKey: 'data.shlagemons.10-15.emboli.description',
  types: [shlagemonTypes.poison],
  coefficient: 15,
  evolutions: [
    { base: pyrolise, condition: { type: 'item', value: lighter } },
    { base: salmoneli, condition: { type: 'item', value: pissBottle } },
    { base: tuberculi, condition: { type: 'item', value: defibrillator } },
  ],
}

export default emboli
