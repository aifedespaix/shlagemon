import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const sulfusouris: BaseShlagemon = {
  id: 'sulfusouris',
  name: 'data.shlagemons.sulfusouris.name',
  description: 'data.shlagemons.sulfusouris.description',

  types: [shlagemonTypes.feu, shlagemonTypes.vol],
  speciality: 'legendary',
}

export default sulfusouris
