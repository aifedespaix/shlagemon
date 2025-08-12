import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const insinerateur: BaseShlagemon = {
  id: 'insinerateur',
  name: 'data.shlagemons.90-95.insinerateur.name',
  description: 'data.shlagemons.90-95.insinerateur.description',
  types: [shlagemonTypes.insecte, shlagemonTypes.feu],
  speciality: 'unique',
}
export default insinerateur
