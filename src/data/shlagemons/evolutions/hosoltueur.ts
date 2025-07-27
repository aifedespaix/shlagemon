import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const hosoltueur: BaseShlagemon = {
  id: 'hosoltueur',
  name: 'Hosoltueur',
  description: `Armé d'un os gigantesque, Hosoltueur règle ses comptes en une seule frappe. Il garde pourtant un air mélancolique en pensant à son enfance perdue.`,
  descriptionKey: 'data.shlagemons.evolutions.hosoltueur.description',
  types: [shlagemonTypes.sol],
}

export default hosoltueur
