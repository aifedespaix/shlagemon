import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const triopikouze: BaseShlagemon = {
  id: 'triopikouze',
  name: 'data.shlagemons.evolutions.triopikouze.name',
  description: 'data.shlagemons.evolutions.triopikouze.description',
  types: [shlagemonTypes.poison, shlagemonTypes.spectre],
  speciality: 'evolution1',
}
export default triopikouze
