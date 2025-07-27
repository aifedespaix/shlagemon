import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import empifouette from './empifouette'

export const boustiflemme: BaseShlagemon = {
  id: 'boustiflemme',
  name: 'Boustiflemme',
  description: `Boustiflemme est le Shlagémon ultime du laisser-aller. Doté d'une apathie légendaire, il passe le plus clair de ses journées à s'étaler de tout son long, cherchant l'endroit le plus mou et le moins dérangeant possible. On raconte qu'il a développé un sixième sens pour repérer la moindre parcelle d'ombre ou de confort, n'hésitant jamais à s'y abandonner pour des siestes interminables.

Sa technique signature, *Soupir Universel*, consiste à expirer si fort qu'il peut assommer d'ennui tout adversaire ambitieux. Capable de repousser toute initiative, Boustiflemme préfère attendre que les occasions viennent littéralement à lui, quitte à rater tout le reste.

Même la nourriture, il ne la chasse pas: il attend qu'elle lui tombe dessus. On dit que certains Boustiflemme restent plusieurs jours sans bouger, se contentant d'observer le monde d'un regard vide mais profondément satisfait. Sa présence dégage une aura soporifique capable de neutraliser même les plus dynamiques des Shlagémons.

En résumé, Boustiflemme ne fait jamais rien... et il le fait très bien.`,
  descriptionKey: 'data.shlagemons.evolutions.boustiflemme.description',
  types: [shlagemonTypes.normal],
  coefficient: 52,
  evolutions: [{
    base: empifouette,
    condition: {
      type: 'lvl',
      value: 62,
    },
  }],
}

export default boustiflemme
