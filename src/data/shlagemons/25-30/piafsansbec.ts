import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import { rapasdepisse } from '../evolutions/rapasdepisse'

export const piafsansbec: BaseShlagemon = {
  id: 'piafsansbec',
  name: 'Piafsansbec',
  description: 'data.shlagemons.25-30.piafsansbec.description',
  types: [shlagemonTypes.vol],
  evolution: { base: rapasdepisse, condition: { type: 'lvl', value: 50 } },
  speciality: 'evolution0',
}
export default piafsansbec
