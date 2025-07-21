import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const noctedard: BaseShlagemon = {
  id: 'noctedard',
  name: 'Noctédard',
  description: `Grand hibou insomniaque, chauve par endroits, avec des seringues plantées dans les plumes et une clope toujours au bec. Parle seul.`,
  descriptionKey: 'data.shlagemons.evolutions.noctedard.description',
  types: [shlagemonTypes.vol, shlagemonTypes.psy],
  coefficient: 89,
}

export default noctedard
