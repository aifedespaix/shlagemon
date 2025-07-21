import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const kistlee: BaseShlagemon = {
  id: 'kistlee',
  name: 'Kistlee',
  description: `Kistlee possède un énorme kyste qui sert autant d'arme que de chaise. Il frappe ses ennemis à coups de pied tout en se plaignant que ça tire un peu.`,
  descriptionKey: 'data.shlagemons.75-80.kistlee.description',
  types: [shlagemonTypes.combat],
  coefficient: 78,
}

export default kistlee
