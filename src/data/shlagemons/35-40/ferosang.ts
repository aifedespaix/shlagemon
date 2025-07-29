import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import coloscopie from '../evolutions/coloscopie'

export const ferosang: BaseShlagemon = {
  id: 'ferosang',
  name: 'Férosang',
  description: 'data.shlagemons.35-40.ferosang.description',
  types: [shlagemonTypes.combat],
  evolution: {
    base: coloscopie,
    condition: {
      type: 'lvl',
      value: 44,
    },
  },
  speciality: 'evolution0',
}
export default ferosang
