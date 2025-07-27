import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'
import { carabifle } from './evolutions/carabifle'

export const carapouffe: BaseShlagemon = {
  id: 'carapouffe',
  name: 'Carapouffe',
  description: `Carapouffe s'est enfoncée dans sa propre carapace moelleuse, elle ne se déplace qu’en roulant lentement, laissant derrière elle une traînée de paillettes et de gloss fondu. Son maquillage dégouline en permanence, formant une couche protectrice impénétrable — les scientifiques appellent ça le « fard d’armure ». Dotée d’un regard mi-séduisant, mi-comateux, elle hypnotise ses adversaires en leur lançant des œillades flasques, accompagnées d’un soupir de lassitude cosmique. Elle passe ses journées à se recoiffer sans bouger la tête, grâce à un système complexe de brosses dissimulées dans son chignon. Sa voix est rauque, son parfum est toxique, et sa principale attaque, "Écrasement Moussant", consiste à s’écrouler violemment sur son ennemi en faisant claquer ses faux ongles.`,
  descriptionKey: 'data.shlagemons.carapouffe.description',
  types: [shlagemonTypes.eau],
  evolution: { base: carabifle, condition: { type: 'lvl', value: 16 } },
  speciality: 'evolution0',
}
export default carapouffe
