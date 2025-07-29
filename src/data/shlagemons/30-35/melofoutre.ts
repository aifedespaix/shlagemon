import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import meladolphe from '../evolutions/meladolphe'

export const melofoutre: BaseShlagemon = {
  id: 'melofoutre',
  name: 'Mélofoutre',
  description: 'data.shlagemons.30-35.melofoutre.description',

  types: [shlagemonTypes.fee, shlagemonTypes.normal],
  evolution: {
    base: meladolphe,
    condition: {
      type: 'lvl',
      value: 70,
    },
  },
  speciality: 'evolution0',
}
export default melofoutre
