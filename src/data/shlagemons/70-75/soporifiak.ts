import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import hypsedentaire from '../evolutions/hypsedentaire'

export const soporifiak: BaseShlagemon = {
  id: 'soporifiak',
  name: 'Soporifiak',
  description: 'data.shlagemons.70-75.soporifiak.description',
  types: [shlagemonTypes.psy],
  evolution: {
    base: hypsedentaire,
    condition: { type: 'lvl', value: 78 },
  },
  speciality: 'evolution0',
}
export default soporifiak
