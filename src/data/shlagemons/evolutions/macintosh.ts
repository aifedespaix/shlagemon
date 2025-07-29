import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const macintosh: BaseShlagemon = {
  id: 'macintosh',
  name: 'Macintosh',
  description: 'data.shlagemons.evolutions.macintosh.description',
  types: [shlagemonTypes.combat],
  speciality: 'evolution2',
}
export default macintosh
