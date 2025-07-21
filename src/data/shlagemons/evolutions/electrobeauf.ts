import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const electrobeauf: BaseShlagemon = {
  id: 'electrobeauf',
  name: 'Électrobeauf',
  description: `DJ de soirée miteuse, Électrobeauf fait exploser les watts et les tympans à coups de beats ringards. Il se prend pour la star des discothèques de camping.`,
  descriptionKey: 'data.shlagemons.evolutions.electrobeauf.description',
  types: [shlagemonTypes.electrique],
  coefficient: 83,
}

export default electrobeauf
