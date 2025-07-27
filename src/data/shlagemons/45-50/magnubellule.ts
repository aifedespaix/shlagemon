import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import magnementon from '../evolutions/magnementon'

export const magnubellule: BaseShlagemon = {
  id: 'magnubellule',
  name: 'Magnubellule',
  description: `Créature née d’une collision entre un vieux canette aimantée et une libellule qui a trop traîné près des flaques de bière tiède, Magnubellule flotte au-dessus des caniveaux et des parkings d’hypermarchés.  
Son corps métallique est cabossé, orné d’antennes tordues et d’ailes translucides qui vibrent avec le bruit d’une mobylette qui cale.  
Sa couleur : un gris terne tacheté de jaune pisse, comme une canette de 8.6 oubliée au soleil.  
Magnubellule plane avec un regard hagard, souvent perché, prêt à déblatérer des chiffres mystérieux.  
Son attaque signature, *Brise-Canette*, projette un jet mousseux et tiède, laissant ses adversaires confus — entre 8 souvenirs égarés et 6 excuses bancales.

On raconte que chaque fois que Magnubellule passe en rase-motte, il laisse derrière lui une énigme de la loose et une odeur de festival terminé depuis trois semaines.`,
  descriptionKey: 'data.shlagemons.45-50.magnubellule.description',
  types: [shlagemonTypes.electrique, shlagemonTypes.insecte],
  coefficient: 48,

  evolutions: [{
    base: magnementon,
    condition: {
      type: 'lvl',
      value: 61,
    },
  }],
}

export default magnubellule
