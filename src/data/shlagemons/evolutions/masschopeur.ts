import type { BaseShlagemon } from '~/type'
import { ultraSteroid } from '~/data/items'
import { shlagemonTypes } from '../../shlagemons-type'
import macintosh from './macintosh'

export const masschopeur: BaseShlagemon = {
  id: 'masschopeur',
  name: 'Masschopeur',
  description: `Masschopeur est l’évolution égotique et désastreuse de Macho. Plus musclé, plus bronzé, plus insupportable. Sa beauté indéniable est un piège : derrière ses abdos symétriques et son sourire UltraWhite™ se cache un Shlagémon **toxique à souhait**.

Il ne combat pas pour la victoire : il combat pour l’ego. Chaque confrontation est un prétexte pour exhiber ses muscles huilés et réciter des punchlines dégoulinantes de narcissisme. Il commence toujours ses attaques par "*T’as vu ces pecs ?*" avant d’enchaîner avec *Flex Infernaux*, qui inflige des dégâts mentaux liés à l’humiliation.

Sa capacité *Ghosting Flash* permet de fuir instantanément un combat sentimental après avoir fait croire à un "truc sérieux". Il est immunisé aux types cœur et sincérité.

Malgré ses défauts évidents, il **choppe**. Tout le temps. C’est inexplicable. Peut-être le combo parfum discount + regard de prédateur affectif. Peut-être une malédiction. Ou une stat secrète appelée "charisme de l’enfer". Les scientifiques hésitent encore.

On raconte qu’il s’auto-like sur Pokégram avec des faux comptes et laisse des commentaires à base de "🔥🔥🔥 t trop bg frèro".`,
  descriptionKey: 'data.shlagemons.evolutions.masschopeur.description',
  types: [shlagemonTypes.combat],
  evolution: {
    base: macintosh,
    condition: {
      type: 'item',
      value: ultraSteroid,
    },
  },
}

export default masschopeur
