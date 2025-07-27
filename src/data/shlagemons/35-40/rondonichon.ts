import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import grochichon from '../evolutions/grochichon'

export const rondonichon: BaseShlagemon = {
  id: 'rondonichon',
  name: 'Rondonichon',
  description: `Rondonichon est une boule de poils disgracieuse et auto-satisfaite, coincée quelque part entre un hamster de cantine et un sex-toy défectueux. Il rebondit sans arrêt sur ses deux gros tétons, qu’il utilise comme ressorts, et laisse derrière lui une traînée de bave et d’inconfort.

Né d’un croisement douteux avec une peluche retrouvée dans un vide-ordures, il chante des berceuses de PMU et rote sur l’intro. Son attaque *Ballon-Mamelon* fait jaillir un lait tiède dont l’odeur provoque des confusions massives, même chez les Shlagémons rouillés.

Il adore s’incruster dans les sacs des dresseurs pour “y faire sa sieste”, mais finit toujours par s’y reproduire à l’insu de tous. On dit qu’un seul Rondonichon peut contaminer une Shlagéball pour toujours.

Ne pas le caresser. Jamais.`,
  descriptionKey: 'data.shlagemons.35-40.rondonichon.description',

  types: [shlagemonTypes.normal],
  evolution: {
    base: grochichon,
    condition: {
      type: 'lvl',
      value: 55,
    },
  },
}

export default rondonichon
