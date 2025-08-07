import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const macintosh: BaseShlagemon = {
  id: 'macintosh',
  name: 'data.shlagemons.evolutions.macintosh.name',
  description: 'data.shlagemons.evolutions.macintosh.description',
  types: [shlagemonTypes.combat],
  speciality: 'evolution2',
}
export default macintosh
