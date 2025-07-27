import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import heriplouf from '../evolutions/heriplouf'

export const hericouille: BaseShlagemon = {
  id: 'hericouille',
  name: 'Héricouille',
  description: `Petit hérisson gris, les flammes ne s’allument plus. Il tousse en permanence, il a des brûlures aux fesses.`,
  descriptionKey: 'data.shlagemons.65-70.hericouille.description',
  types: [shlagemonTypes.feu],
  coefficient: 69,
  evolutions: [{
    base: heriplouf,
    condition: { type: 'lvl', value: 81 },
  }],
}

export default hericouille
