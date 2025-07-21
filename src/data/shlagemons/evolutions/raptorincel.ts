import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import dracoCon from './draco-con'

export const raptorincel: BaseShlagemon = {
  id: 'raptorincel',
  name: 'Raptor Incel',
  description: `Raptor Incel est l’évolution naturellement toxique de Salamiches. Plus grand, plus anguleux, mais toujours aussi fragile intérieurement, il crache des flammes tièdes tout en débitant des discours passifs-agressifs sur "les vrais dresseurs" et "les femelles qui aiment que les Tortanks".

Son hoodie à capuche intégrée est maintenant fusionné à sa peau, et sa flamme est alimentée uniquement par les débats Twitter auxquels personne ne participe. Il se déplace par bonds secs, comme s’il avait des choses à prouver à chaque pas, ce qui rend sa démarche aussi ridicule qu’hostile.

Il possède une attaque spéciale : *Flamme Frustrée*, qui explose si l’adversaire est un Shlagémon féminin. Il peut aussi utiliser *Monologue Évolutif*, une capacité qui fait fuir les ennemis en leur expliquant pourquoi ils ont tort d'exister.

On le trouve souvent dans des grottes sombres, en train de taper sur des claviers invisibles tout en s’entraînant à l’art du regard méprisant. Son rêve ? Devenir le Shlagémon alpha… et surtout que quelqu’un daigne lui répondre un jour.`,
  descriptionKey: 'data.shlagemons.evolutions.raptorincel.description',
  types: [shlagemonTypes.feu],
  coefficient: 25,
  evolution: { base: dracoCon, condition: { type: 'lvl', value: 36 } },
}

export default raptorincel
