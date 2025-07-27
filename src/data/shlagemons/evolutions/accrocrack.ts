import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const accrocrack: BaseShlagemon = {
  id: 'accrocrack',
  name: 'Accrocrack',
  description: `Accrocrack est ce qu’on appelle un “mauvais trip évolutif”. Il s’agit de l’évolution tragique de Psykonaute, après que celui-ci ait remplacé ses pétards artisanaux par des cailloux chimiques bien plus violents.

Avec ses plumes en vrac, son regard halluciné et son bec fendu par les rires nerveux, Accrocrack passe son temps à errer dans des zones sombres du Shlagédex, frottant frénétiquement le sol à la recherche d’une pipe imaginaire. Son cri strident évoque à la fois le manque et la détresse existentielle.

Il porte parfois un sac plastique en guise de cape et marmonne des théories cosmologiques incompréhensibles à des lampadaires. Son attaque signature, *Flashback Violent*, plonge tous les combattants dans une confusion intense pendant plusieurs tours. Il utilise aussi *Tirage d’Urgence*, qui lui permet de rejouer un tour au prix de la moitié de sa santé mentale.`,
  descriptionKey: 'data.shlagemons.evolutions.accrocrack.description',
  types: [shlagemonTypes.eau],
}

export default accrocrack
