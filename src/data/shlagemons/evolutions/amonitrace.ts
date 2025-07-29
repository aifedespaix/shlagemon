import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const amonitrace: BaseShlagemon = {
  id: 'amonitrace',
  name: 'Amonitrace',
  description: 'data.shlagemons.evolutions.amonitrace.description',
  types: [shlagemonTypes.roche, shlagemonTypes.eau],
  speciality: 'evolution1',
}
export default amonitrace
