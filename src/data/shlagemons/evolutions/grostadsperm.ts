import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const grostadsperm: BaseShlagemon = {
  id: 'grostadsperm',
  name: 'Grostadsperm',
  description: `Plus massif, plus flasque, Grostadsperm ressemble à une montagne de slime terne, parsemée de grumeaux douteux et de traînées visqueuses. Son odeur est… indescriptible, oscillant entre la sueur froide et la vieille lessive oubliée. Son visage affiche une fierté louche, le regard lointain, les bras mous toujours occupés à se tripoter sans gêne.

Son attaque fétiche, *MasturBave*, recouvre le terrain d’une vague glissante et odorante, forçant l’ennemi à faire du surplace. On dit qu’il se nourrit exclusivement de restes de kleenex sales et adore zoner près des douches collectives.

Anecdote : Il paraît qu’en période de reproduction, il faut désinfecter toute la zone après son passage…`,
  descriptionKey: 'data.shlagemons.evolutions.grostadsperm.description',
  types: [shlagemonTypes.poison],
  coefficient: 65,
}

export default grostadsperm
