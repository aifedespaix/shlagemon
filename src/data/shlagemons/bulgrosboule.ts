import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'
import { barbeBizarre } from './evolutions/barbe-bizarre'

export const bulgrosboule: BaseShlagemon = {
  id: 'bulgrosboule',
  name: 'data.shlagemons.bulgrosboule.name',
  description: 'data.shlagemons.bulgrosboule.description',
  types: [shlagemonTypes.plante],
  evolution: { base: barbeBizarre, condition: { type: 'lvl', value: 16 } },
  speciality: 'evolution0',
}
export default bulgrosboule
