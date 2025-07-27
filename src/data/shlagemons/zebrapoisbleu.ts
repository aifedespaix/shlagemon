import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const zebrapoisbleu: BaseShlagemon = {
  id: 'zebrapoisbleu',
  name: 'ZebraPoisBleu',
  description: `ZebraPoisBleu est un Shlagémon ultra rare, aperçu seulement au lever de la rosée, lové contre un buisson de pois bleus luminescents. Il a l’apparence d’un petit zèbre dodu, tout doux et pastel, assis en position de méditation foireuse, le regard serein et l’odeur envoûtante.

Son corps est bleu ciel délavé, constellé de grosses fleurs bleues enfoncées dans sa crinière et sa croupe, comme si quelqu’un avait essayé de le coiffer avec amour… mais les yeux fermés. Ces fleurs émettent des ondes zen, qui provoquent un état second chez les Shlagémons autour : soit ils s’endorment paisiblement, soit ils partent en crise de larmes incontrôlables.

Il tient souvent une fleur magique entre les pattes avant, qu’il serre contre son torse en murmurant des phrases bizarres genre "calme ta violence intérieure, frère." Sa posture est totalement amorphe, il est posé comme une patate bouillie, mais avec la grâce d’un maître zen oublié depuis longtemps.

Expression faciale : un sourire béat, yeux clos, genre "je plane à 3 cm du sol, et c’est très bien comme ça."
Détail absurde : des petits pétales bleus lui sortent parfois des oreilles quand il éternue.
Aura : un halo féerique vaporeux, avec des particules bleutées, un peu comme un encens cosmique.

Ce Shlagémon n’attaque jamais directement. Il infuse le terrain d’une paix surnaturelle qui rend confus tous les Shlagémons agressifs. Sauf s’ils ont le type Métal Brutal, là ça les énerve encore plus.`,
  descriptionKey: 'data.shlagemons.electhordu.description',

  types: [shlagemonTypes.psy, shlagemonTypes.vol],
  speciality: 'legendary',
}

export default zebrapoisbleu
