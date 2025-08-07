import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import crustabridou from '../evolutions/crustabridou'

export const cookieyas: BaseShlagemon = {
  id: 'cookieyas',
  name: 'data.shlagemons.50-55.cookieyas.name',
  description: 'data.shlagemons.50-55.cookieyas.description',
  types: [shlagemonTypes.eau],

  evolution: {
    base: crustabridou,
    condition: {
      type: 'lvl',
      value: 61,
    },
  },
  speciality: 'evolution0',
}
export default cookieyas
