import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import feunouille from '../evolutions/feunouille'

export const goubite: BaseShlagemon = {
  id: 'goubite',
  name: 'Goubite',
  description: `Goubite est difficile à regarder... et encore plus difficile à oublier. Doté d’un corps long et rosâtre, légèrement bombé sur le haut, il est souvent victime de malentendus anatomiques dans les écoles de dresseurs. Pourtant, lui, il s’assume. Fier, droit, et toujours un peu moite. Sa tête est cerclée d’une barbe flasque, dégoulinante de sueur tiède, qu’il secoue parfois pour marquer son territoire. Il sourit en permanence, d’un air satisfait qui met tout le monde mal à l’aise, même les aveugles. Ses pieds sont fripés, velus, et sentent la crevette oubliée dans une chaussette humide. Il se déplace lentement en produisant un petit bruit mou et répétitif, comparable à un bisou dont on ne veut pas. Sa capacité signature, *Giclée Visqueuse*, inflige des dégâts modérés mais impose un malus mental permanent à ceux qui en sont témoins. Certains affirment qu’il peut aussi lancer *Barbe Emotive*, une attaque qui colle et qui sent la salle de muscu humide. À ne pas confondre avec un objet sexuel. Sauf si vraiment on est pressé de consulter.`,
  descriptionKey: 'data.shlagemons.15-20.goubite.description',
  types: [shlagemonTypes.feu],
  coefficient: 19,
  evolution: {
    base: feunouille,
    condition: {
      type: 'lvl',
      value: 80,
    },
  },
}

export default goubite
