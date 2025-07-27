import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const insinerateur: BaseShlagemon = {
  id: 'insinerateur',
  name: 'Insinérateur',
  description: `Armé de lames insectes, il a surtout envie de mettre le feu à tout ce qui bouge. Sa passion pour la combustion le rend particulièrement dangereux dans les forêts.`,
  descriptionKey: 'data.shlagemons.90-95.insinerateur.description',
  types: [shlagemonTypes.insecte],
  speciality: 'unique',
}
export default insinerateur
