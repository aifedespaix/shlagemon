import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const taurus: BaseShlagemon = {
  id: 'taurus',
  name: 'Taurus',
  description: `Taurus est littéralement un taureau géométrique. Ses angles parfaits le rendent difficile à approcher sans se prendre une arrête dans les côtes.`,
  descriptionKey: 'data.shlagemons.95-100.taurus.description',
  types: [shlagemonTypes.normal],
  coefficient: 98,
}

export default taurus
