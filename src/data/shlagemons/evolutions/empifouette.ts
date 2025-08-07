import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const empifouette: BaseShlagemon = {
  id: 'empifouette',
  name: 'data.shlagemons.evolutions.empifouette.name',
  description: 'data.shlagemons.evolutions.empifouette.description',
  types: [shlagemonTypes.poison, shlagemonTypes.plante],
  speciality: 'evolution2',
}
export default empifouette
