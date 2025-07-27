import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const mairiousse: BaseShlagemon = {
  id: 'mairiousse',
  name: 'Mairiousse',
  description: `Mairiousse est un énorme chien blanc au poil jauni par l’usure, toujours affublé d’une écharpe tricolore crado, mal ajustée, qui pendouille de travers sur son flanc. Son torse est bombé comme s’il venait de serrer une cinquantième main municipale, mais ses pattes sont molles et déformées par trop de réunions debout. Il porte des lunettes de vue sales, à moitié embuées, calées sur un museau humide qui bave en permanence.

Son regard est épuisé mais autoritaire, avec un sourcil levé de travers et l’autre tombant comme un panneau d'interdiction arraché. Il traîne derrière lui un petit nuage d’odeur de vieux bureau moisi, et des miettes de galette des rois restent coincées dans ses babines depuis janvier. L’un de ses crocs dépasse légèrement, usé comme un stylo Bic mâchonné en conseil communal.

Il tient debout dans une posture ridicule mais solennelle, un peu penché, une patte sur un vieux micro cassé et l’autre tremblante sur un registre municipal couvert de poils. Parfois, il lève la patte par réflexe… sur une urne électorale.

On dit que Mairiousse n’aboie pas : il fait des discours interminables qui endorment les Shlagémons ennemis d’ennui profond.`,
  descriptionKey: 'data.shlagemons.mairiousse.description',

  types: [shlagemonTypes.sol, shlagemonTypes.eau],
  speciality: 'legendary',
}

export default mairiousse
