import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const grochichon: BaseShlagemon = {
  id: 'grochichon',
  name: 'data.shlagemons.evolutions.grochichon.name',
  description: 'data.shlagemons.evolutions.grochichon.description',

  types: [shlagemonTypes.normal, shlagemonTypes.poison],
  speciality: 'evolution1',
}
export default grochichon
