import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const insinerateur: BaseShlagemon = {
  id: 'insinerateur',
  name: 'Insinérateur',
  description: `Armé de lames insectes, il a surtout envie de mettre le feu à tout ce qui bouge. Sa passion pour la combustion le rend particulièrement dangereux dans les forêts.`,
  types: [shlagemonTypes.insecte],
  coefficient: 92,
}

export default insinerateur
