import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const nosferasta: BaseShlagemon = {
  id: 'nosferasta',
  name: 'Nosferasta',
  description: `Nosferasta est l’éveil spirituel ultime de Nosferailleur. À mesure qu’il grandit, ses ailes se parent de dreadlocks tressées dans la laine d’un Ponchien mystique, et une douce aura verte l’entoure en permanence.

Influencé par les écrits rastafaris et les vinyles usés de Koffeekeur et Bombé Marlée, il prêche une philosophie de vie fondée sur la non-violence, la connexion avec la nature, et une consommation très généreuse de plantes médicinales. Il parle en paraboles confuses, parfois entrecoupées de rires nerveux ou de citations approximatives de textes sacrés qu’il n’a jamais vraiment lus.

Son attaque signature *Chant de Jah* étourdit tous les ennemis dans un large rayon, accompagnée d’un léger fondu reggae et d’un relent suspect. On dit que même les Pokémon de type acier se détendent à son contact.`,
  descriptionKey: 'data.shlagemons.evolutions.nosferasta.description',

  types: [shlagemonTypes.poison, shlagemonTypes.vol],
  coefficient: 33,
}

export default nosferasta
