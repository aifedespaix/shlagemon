import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import dartagnan from './dartagnan'

export const coconnul: BaseShlagemon = {
  id: 'coconnul',
  name: 'Coconnul',
  evolutions: [{
    base: dartagnan,
    condition: {
      type: 'lvl',
      value: 25,
    },
  }],
  description: `Coconnul est une tentative d'évolution qui a mal tourné. Coincé dans une coquille trop petite pour son ego mais trop grande pour ses ambitions, il passe ses journées à soupirer et à dire "j’suis désolé" même quand personne ne lui parle.

Son armure censée être rigide est molle comme du carton détrempé, et son attaque principale, *Jet de Doute*, inflige un léger inconfort moral à l’adversaire... et surtout à lui-même. Il rate 90% de ses attaques, 100% de ses esquives, et 120% de ses décisions.

Il perd tous ses combats, même contre des adversaires inanimés. On l’a déjà vu perdre un duel contre une pierre. Il s’est ensuite excusé auprès de la pierre.

Il ne croit en rien, pas même en ses propres stats. D’ailleurs, son cri ressemble à un "haaaan..." suivi d’un bruit de plastique qui se dégonfle.

Sa capacité passive, *Auto-Sabotage*, lui fait perdre 1 point de vie à chaque fois qu’on l’encourage. On dit qu’il pourrait évoluer en quelque chose de puissant... mais qu’il "veut pas déranger".

Il traîne dans les buissons, évite les regards et se planque dès qu’il entend le mot "match". Une icône de la lose, une légende de l’échec.`,
  descriptionKey: 'data.shlagemons.evolutions.coconnul.description',
  types: [shlagemonTypes.insecte],
  coefficient: 10,
}

export default coconnul
