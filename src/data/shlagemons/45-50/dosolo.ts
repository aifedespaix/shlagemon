import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import dopluspersonne from '../evolutions/dopluspersonne'

export const dosolo: BaseShlagemon = {
  id: 'dosolo',
  name: 'data.shlagemons.45-50.dosolo.name',
  description: 'data.shlagemons.45-50.dosolo.description',
  types: [shlagemonTypes.normal, shlagemonTypes.vol],

  evolution: {
    base: dopluspersonne,
    condition: {
      type: 'lvl',
      value: 83,
    },
  },
  speciality: 'evolution0',
}
export default dosolo
