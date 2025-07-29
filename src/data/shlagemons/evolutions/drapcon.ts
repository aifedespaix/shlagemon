import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import drapcoloscopie from './drapcoloscopie'

export const drapcon: BaseShlagemon = {
  id: 'drapcon',
  name: 'DrapCon',
  description: 'data.shlagemons.evolutions.drapcon.description',
  types: [shlagemonTypes.dragon],
  evolution: {
    base: drapcoloscopie,
    condition: { type: 'lvl', value: 100 },
  },
  speciality: 'evolution1',
}
export default drapcon
