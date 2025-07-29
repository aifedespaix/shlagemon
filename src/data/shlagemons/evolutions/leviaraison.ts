import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const leviaraison: BaseShlagemon = {
  id: 'leviaraison',
  name: 'Léviaraison',
  description: 'data.shlagemons.evolutions.leviaraison.description',
  types: [shlagemonTypes.eau, shlagemonTypes.vol],
  speciality: 'evolution1',
}
export default leviaraison
