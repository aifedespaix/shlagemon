import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import hyporuisseau from '../evolutions/hyporuisseau'

export const hypotrompe: BaseShlagemon = {
  id: 'hypotrompe',
  name: 'data.shlagemons.85-90.hypotrompe.name',
  description: 'data.shlagemons.85-90.hypotrompe.description',
  types: [shlagemonTypes.eau],
  evolution: {
    base: hyporuisseau,
    condition: { type: 'lvl', value: 92 },
  },
  speciality: 'evolution0',
}
export default hypotrompe
