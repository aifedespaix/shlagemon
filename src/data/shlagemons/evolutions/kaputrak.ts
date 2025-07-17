import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const kaputrak: BaseShlagemon = {
  id: 'kaputrak',
  name: 'Kaputrak',
  description: `Issu de Kraputo, ce guerrier fossile manie des lames rouillées et vit dans la paranoïa permanente.`,
  types: [shlagemonTypes.roche, shlagemonTypes.eau],
  coefficient: 74,
}

export default kaputrak
