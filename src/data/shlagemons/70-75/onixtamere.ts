import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const onixtamere: BaseShlagemon = {
  id: 'onixtamere',
  name: 'Onixtamere',
  description: `Onixtamere est un gigantesque serpent de pierre qui se prend pour une reine tout en se déguisant en ta maman. Il parade au milieu des canyons en vantant ses conquêtes de papas comme d’autres collectionnent les cailloux. Son corps segmenté résonne à chaque mouvement, histoire d’annoncer son arrivée bien avant qu’il ouvre la bouche.`,
  descriptionKey: 'data.shlagemons.70-75.onixtamere.description',
  types: [shlagemonTypes.sol, shlagemonTypes.roche],
  coefficient: 71,
}

export default onixtamere
