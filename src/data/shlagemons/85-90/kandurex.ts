import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const kandurex: BaseShlagemon = {
  id: 'kandurex',
  name: 'Kandurex',
  description: `Toujours équipé de préservatifs fluo, Kandurex vante ses prouesses au lit à qui veut l'entendre. Il distribue des conseils douteux sur la reproduction entre deux uppercuts.`,
  types: [shlagemonTypes.normal],
  coefficient: 86,
}

export default kandurex
