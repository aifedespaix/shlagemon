import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const artichaud: BaseShlagemon = {
  id: 'artichaud',
  name: 'data.shlagemons.artichaud.name',
  description: 'data.shlagemons.artichaud.description',

  types: [shlagemonTypes.glace, shlagemonTypes.vol],
  speciality: 'legendary',
}

export default artichaud
