import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const dracoCon: BaseShlagemon = {
  id: 'draco-con',
  name: 'Draco Con',
  description: `Draco-con est la dernière forme de l’ancienne lignée des Salamiches. En apparence, c’est un dragon colossal, avec des ailes de moto-tuning, des flammes arc-en-bouse et des muscles qui crient "anabolisés". Mais derrière cette façade volcanique se cache une stupidité abyssale.

Il confond souvent ses propres attaques avec celles de l’adversaire, et peut littéralement s’auto-cramer en tentant un *Jet d’Feu Vers le Vent*. Son cri de guerre est un mélange d’aboiement rauque et de rot mal digéré, et il ne comprend pas pourquoi les autres fuient quand il parle stratégie.

Draco-con adore faire des lives en pleine arène pour dire "yo la team" à ses 3 abonnés imaginaires. Il pense que ses écailles brillent parce qu’il est rare, alors qu’en réalité, c’est juste de la graisse de kebab incrustée.

Il possède la capacité *Combo Kéké*, qui mélange toutes ses attaques en un seul mouvement incohérent, mais bruyant. Résultat : les ennemis sont plus confus que blessés, et parfois, ils tombent simplement d’ennui.

On dit que même le Professeur Merdant a arrêté d’essayer de l’étudier : "trop con pour la science", selon ses notes.`,
  descriptionKey: 'data.shlagemons.evolutions.draco-con.description',
  types: [shlagemonTypes.feu, shlagemonTypes.vol],
  coefficient: 50,
}

export default dracoCon
