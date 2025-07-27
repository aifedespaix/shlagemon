import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const feunouille: BaseShlagemon = {
  id: 'feunouille',
  name: 'Feunouille',
  description: `Feunouille est une erreur de casting dans l’évolution de Goupichiant. Persuadé d’être un Pokémon légendaire, il parade avec ses neuf queues en synthétique mal accrochées, achetées sur Vinted dans une vente privée de furries déchus.

Son pelage est cramé par endroits à cause de ses propres attaques ratées, et il porte un piercing lumineux au museau qui clignote en rythme avec ses crises d’égo. Il utilise *Flamme AutoBronzante* pour se donner un teint de feu, mais finit souvent orange carotte.

Feunouille attaque rarement, sauf si on critique son style ou qu’on dit que Ninetales est "mieux designé". Dans ce cas, il enchaîne *Queue-Slap TikTok* et *Souffle de Théorie Fumeuse*, une combinaison qui désoriente tous les Shlagémons normaux.

Il est persuadé d’être l’élu d’une prophétie inventée par lui-même. Aucun autre Shlagémon ne valide.`,
  descriptionKey: 'data.shlagemons.evolutions.feunouille.description',

  types: [shlagemonTypes.feu],
}

export default feunouille
