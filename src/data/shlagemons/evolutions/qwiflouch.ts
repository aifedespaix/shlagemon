import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const qwiflouch: BaseShlagemon = {
  id: 'qwiflouch',
  name: 'Qwiflouch',
  description: 'data.shlagemons.evolutions.qwiflouch.description',
  types: [shlagemonTypes.eau, shlagemonTypes.poison],
  speciality: 'evolution1',
}
export default qwiflouch
