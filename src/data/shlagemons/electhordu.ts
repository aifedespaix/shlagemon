import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const electhordu: BaseShlagemon = {
  id: 'electhordu',
  name: 'data.shlagemons.electhordu.name',
  description: 'data.shlagemons.electhordu.description',

  types: [shlagemonTypes.electrique, shlagemonTypes.vol],
  speciality: 'legendary',
}

export default electhordu
