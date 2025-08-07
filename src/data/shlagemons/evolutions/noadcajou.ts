import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const noadcajou: BaseShlagemon = {
  id: 'noadcajou',
  name: 'data.shlagemons.evolutions.noadcajou.name',
  description: 'data.shlagemons.evolutions.noadcajou.description',
  types: [shlagemonTypes.plante, shlagemonTypes.psy],
  speciality: 'evolution1',
}
export default noadcajou
