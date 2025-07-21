import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const poissomerguez: BaseShlagemon = {
  id: 'poissomerguez',
  name: 'Poissomerguez',
  description: `Poissomerguez dégage une forte odeur de barbecue. Il fait frire l'eau autour de lui et provoque des fringales incontrôlables chez ses adversaires.`,
  descriptionKey: 'data.shlagemons.evolutions.poissomerguez.description',
  types: [shlagemonTypes.eau],
  coefficient: 93,
}

export default poissomerguez
