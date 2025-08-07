import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const mairiousse: BaseShlagemon = {
  id: 'mairiousse',
  name: 'data.shlagemons.mairiousse.name',
  description: 'data.shlagemons.mairiousse.description',

  types: [shlagemonTypes.sol, shlagemonTypes.eau],
  speciality: 'legendary',
}

export default mairiousse
