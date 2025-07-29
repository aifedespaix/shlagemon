import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import { floripute } from './floripute'

export const barbeBizarre: BaseShlagemon = {
  id: 'barbe-bizarre',
  name: 'Barbebizarre',
  description: 'data.shlagemons.evolutions.barbe-bizarre.description',

  types: [shlagemonTypes.plante],
  evolution: { base: floripute, condition: { type: 'lvl', value: 36 } },
  speciality: 'evolution0',
}
export default barbeBizarre
