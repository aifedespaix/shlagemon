import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const zebrapoisbleu: BaseShlagemon = {
  id: 'zebrapoisbleu',
  name: 'data.shlagemons.zebrapoisbleu.name',
  description: 'data.shlagemons.electhordu.description',

  types: [shlagemonTypes.psy, shlagemonTypes.vol],
  speciality: 'legendary',
}

export default zebrapoisbleu
