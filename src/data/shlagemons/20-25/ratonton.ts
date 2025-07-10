import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import ratartine from '../evolutions/ratartine'

export const ratonton: BaseShlagemon = {
  id: 'ratonton',
  name: 'Ratonton',
  description: `Ratonton est un vieux tonton en forme de rat mal rasé, expert en mauvaise foi et en tir au fer. Il ne court pas, il trottine en râlant, le bide en avant, sa moustache grise tremblotant au rythme de ses ricanements. Il vit dans des campings à l’année et pense que la pétanque est un art martial ancestral.

Toujours armé d’une boule cabossée et d’un verre de pastis tiède, il attaque avec *Lancer de Boule Aléatoire*, qui a 50% de chances de rater la cible mais 100% de chances de démolir une glaciaire innocente. Son haleine est classée *toxique* dans certains pays, et sa capacité passive, *Verre Dans Le Nez*, réduit sa précision mais augmente son attaque à chaque toast.

Ratonton parle fort, dit toujours "t’as vu c’est technique hein" après un échec, et se bat uniquement s’il a perdu à la belote. Il peut également utiliser *Tontonade*, une attaque confuse qui consiste à expliquer des règles inventées de pétanque tout en te bousculant verbalement.

Il adore les coins d’ombre, les parasols Lidl, et les anecdotes gênantes. Si on lui parle de retraite ou de régime, il se met à ronfler de colère. Pourtant, malgré tout, il est fidèle. Et il sent le Ricard à 8h du matin.`,
  types: [shlagemonTypes.normal],
  coefficient: 25,
  evolution: { base: ratartine, condition: { type: 'lvl', value: 45 } },
}

export default ratonton
