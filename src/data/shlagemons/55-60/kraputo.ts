import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import kaputrak from '../evolutions/kaputrak'

export const kraputo: BaseShlagemon = {
  id: 'kraputo',
  name: 'Kraputo',
  description: 'data.shlagemons.55-60.kraputo.description',
  types: [shlagemonTypes.roche, shlagemonTypes.eau],
  evolution: {
    base: kaputrak,
    condition: { type: 'lvl', value: 75 },
  },
  speciality: 'evolution0',
}
export default kraputo
