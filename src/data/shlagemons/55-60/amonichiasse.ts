import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import amonitrace from '../evolutions/amonitrace'

export const amonichiasse: BaseShlagemon = {
  id: 'amonichiasse',
  name: 'data.shlagemons.55-60.amonichiasse.name',
  description: 'data.shlagemons.55-60.amonichiasse.description',
  types: [shlagemonTypes.roche, shlagemonTypes.eau],
  evolution: {
    base: amonitrace,
    condition: { type: 'lvl', value: 72 },
  },
  speciality: 'evolution0',
}
export default amonichiasse
