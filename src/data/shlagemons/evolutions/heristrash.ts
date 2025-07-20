import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const heristrash: BaseShlagemon = {
  id: 'heristrash',
  name: 'Héristrash',
  description: `Ressemble à un raton-laveur carbonisé. Les flammes sont vertes et sentent l’œuf pourri.`,
  types: [shlagemonTypes.feu, shlagemonTypes.poison],
  coefficient: 95,
}

export default heristrash
