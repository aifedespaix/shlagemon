import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const artichaud: BaseShlagemon = {
  id: 'artichaud',
  name: 'Artichaud',
  description: 'data.shlagemons.artichaud.description',

  types: [shlagemonTypes.glace, shlagemonTypes.vol],
  speciality: 'legendary',
}

export default artichaud
