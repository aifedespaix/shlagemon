import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const grossetarte: BaseShlagemon = {
  id: 'grossetarte',
  name: 'Grossetarte',
  description: `Grossetarte est l’évolution regrettable de Ptitocard, obtenue après une overdose de sucre industriel et de mauvaises idées. Autoproclamé "Maître Tartenier", il passe ses journées à cuisiner, lancer et... recuire des tartes. Le problème ? Ses créations sont infâmes. Collantes, croquantes, souvent vivantes, elles causent plus de dégâts buccaux que toutes les chutes de trottoirs réunies.

Il ne se bat pas : il *sert*. À répétition. Son attaque *Service Trois Parts* invoque une volée de projectiles pâtissiers, chacun ayant une texture plus imprévisible que le précédent. Il dispose aussi de *Croûte Brutale*, une attaque physique qui explose en miettes de granite sucré, infligeant des blessures internes et une honte culinaire durable.

Certains Shlagémons l’évitent non pas par peur, mais par goût. On raconte qu’un seul fragment de sa Tarte Ultime peut bloquer une mâchoire pendant 3 jours.`,
  descriptionKey: 'data.shlagemons.evolutions.grossetarte.description',
  types: [shlagemonTypes.eau],
  coefficient: 57,
}

export default grossetarte
