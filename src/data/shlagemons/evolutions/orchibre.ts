import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import rafflamby from './rafflamby'

export const orchibre: BaseShlagemon = {
  id: 'orchibre',
  name: 'data.shlagemons.evolutions.orchibre.name',
  description: 'data.shlagemons.evolutions.orchibre.description',

  types: [shlagemonTypes.plante, shlagemonTypes.poison],
  evolution: {
    base: rafflamby,
    condition: {
      type: 'lvl',
      value: 90,
    },
  },
  speciality: 'evolution1',
}
export default orchibre
