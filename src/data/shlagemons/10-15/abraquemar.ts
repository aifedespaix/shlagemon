import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import kadavrebras from '../evolutions/kadavrebras'

export const abraquemar: BaseShlagemon = {
  id: 'abraquemar',
  name: 'Abraquemar',
  evolution: {
    base: kadavrebras,
    condition: {
      type: 'lvl',
      value: 46,
    },
  },
  description: `Abraquemar est adepte de la sieste transcendantale et de la fuite passive-agressive. À la moindre interaction sociale, il disparaît dans un nuage de poussière en marmonnant "j’te sens pas, j’me tire". Son taux de fuite est de 100%, sauf s’il entend une discussion sur les chakras ou les promos sur les tapis ethniques. On le trouve souvent assis en tailleur, les yeux mi-ouverts, entre deux posters de l’Univers collés avec du chewing-gum. Il porte toujours une capuche trop grande et une écharpe mal nouée, et prétend être "entre deux plans d’alignement stellaire". Sa capacité spéciale, *Téléportation du Malaise*, permet d’échanger de place avec une poubelle proche. Il possède aussi l’attaque *Sérénité Forcée*, qui fait baisser l’attaque ennemie par culpabilité énergétique. Abraquemar évolue uniquement quand il arrête de dire “j’ai pas envie de fight, moi je suis plus dans la vibe.”`,
  types: [shlagemonTypes.psy],
  coefficient: 12,
}

export default abraquemar
