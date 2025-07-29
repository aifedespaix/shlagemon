import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const insinerateur: BaseShlagemon = {
  id: 'insinerateur',
  name: 'Insinérateur',
  description: 'data.shlagemons.90-95.insinerateur.description',
  types: [shlagemonTypes.insecte],
  speciality: 'unique',
}
export default insinerateur
