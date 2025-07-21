import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import grossetarte from '../evolutions/grossetarte'

export const ptitocard: BaseShlagemon = {
  id: 'ptitocard',
  name: 'Ptitocard',
  description: `Ptitocard est aussi fragile qu’une biscotte mouillée et aussi expressif qu’un poisson-panique en pleine crise existentielle. Son regard vide, humide et terriblement plaintif fait fondre les cœurs les plus endurcis — ou les agace profondément, au choix. Il coule plus qu’il ne nage, et sa spirale ventrale ne tourne que lorsqu’il fait une crise d’angoisse. Il bave en permanence, mais pas de la bouche : c’est tout son corps qui transpire la détresse. On pense qu’il est triste de naissance, mais certains spécialistes évoquent une simple allergie à la vie. Sa capacité spéciale, *Larme Infinie*, provoque l’ennui mortel chez l’ennemi. Un adversaire qui regarde Ptitocard pendant plus de 10 secondes peut tomber dans un coma d’indifférence profonde. Ptitocard rêve de devenir un grand champion... mais ne fait rien pour. On le trouve souvent flottant à la surface des flaques, en train de se demander s’il mérite vraiment d’évoluer. Spoiler : pas sûr.`,
  descriptionKey: 'data.shlagemons.05-10.ptitocard.description',
  types: [shlagemonTypes.eau],
  coefficient: 9,
  evolution: {
    base: grossetarte,
    condition: {
      type: 'lvl',
      value: 50,
    },
  },
}

export default ptitocard
