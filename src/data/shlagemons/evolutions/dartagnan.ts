import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const dartagnan: BaseShlagemon = {
  id: 'dartagnan',
  name: 'data.shlagemons.evolutions.dartagnan.name',
  description: 'data.shlagemons.evolutions.dartagnan.description',
  types: [shlagemonTypes.poison],
  speciality: 'evolution2',
}
export default dartagnan
