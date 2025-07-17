import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const krabbolosse: BaseShlagemon = {
  id: 'krabbolosse',
  name: 'Krabbolosse',
  description: `Krabbolosse est un crabe massif mais un peu benêt. Il écrase tout sur son passage en bredouillant des prières en vieux dialecte.`,
  types: [shlagemonTypes.eau],
  coefficient: 82,
}

export default krabbolosse
