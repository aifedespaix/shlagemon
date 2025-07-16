import type { BaseShlagemon } from '~/type'
import { steroids } from '~/data/items/items'
import { shlagemonTypes } from '../../shlagemons-type'
import masschopeur from '../evolutions/masschopeur'

export const macho: BaseShlagemon = {
  id: 'macho',
  name: 'Macho',
  description: `Macho a absorbé trop de protéines... et de podcasts douteux. Musclé comme un couvercle de poubelle et persuadé d’être irrésistible, il passe son temps à faire des pompes, des clins d’œil et des blagues de vestiaire à toute créature possédant deux chromosomes X.

Il parle fort, il sent fort, il pense fort — mais rarement bien. Sa technique *Main au Cul* est redoutée non pas pour ses dégâts, mais pour l’inconfort social qu’elle génère. Il dispose également de l’attaque *Blague de Beauf*, qui inflige un malus d’intelligence à toute l’arène pendant trois tours.

Quand il n’est pas en train de se prendre en selfie devant un miroir cassé, il traîne en groupe avec d'autres Shlagémons virilistes, où ils débattent intensément de "la vraie nature des femelles". Aucun débat n’a encore abouti.

Il évolue parfois... en pire.`,
  types: [shlagemonTypes.combat],
  coefficient: 39,
  evolution: {
    base: masschopeur,
    condition: {
      type: 'item',
      value: steroids,
    },
  },
}

export default macho
