import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const pyrolise: BaseShlagemon = {
  id: 'pyrolise',
  name: 'Pyrolise',
  description: 'data.shlagemons.evolutions.pyrolise.description',
  types: [shlagemonTypes.feu],
  speciality: 'evolution1',
}
export default pyrolise
