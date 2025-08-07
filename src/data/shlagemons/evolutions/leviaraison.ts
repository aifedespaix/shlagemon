import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const leviaraison: BaseShlagemon = {
  id: 'leviaraison',
  name: 'data.shlagemons.evolutions.leviaraison.name',
  description: 'data.shlagemons.evolutions.leviaraison.description',
  types: [shlagemonTypes.eau, shlagemonTypes.vol],
  speciality: 'evolution1',
}
export default leviaraison
