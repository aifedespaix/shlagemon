import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import coloscopie from '../evolutions/coloscopie'

export const ferosang: BaseShlagemon = {
  id: 'ferosang',
  name: 'Férosang',
  description: `Férosang est une créature hargneuse, incontrôlable, et surtout passionnée par sa propre hémorragie. Il n’aime pas saigner : il *vit* pour ça. Chaque plaie est pour lui un trophée, chaque croûte une médaille. Il se cogne exprès les arcades contre des barres de skate, se jette volontairement en roulant sur du gravier, et fait exprès de rater ses tricks pour s’en coller une.

Il a déjà tenté de donner son sang, mais les médecins lui ont dit qu’il n’en avait plus assez. "Trop de pertes, mon reuf", lui a lancé l’infirmière en fixant son coton-tige déjà rouge avant la piqûre. Depuis, il y retourne juste pour se faire piquer.

Férosang est recouvert de pansements douteux, de croûtes arrachées trop tôt et de tatouages faits avec du stylo bic. Ses poings sont constamment en sang, soit parce qu’il frappe, soit parce qu’il frappe *mal*. On le voit souvent rire après s’être pris une droite dans le nez par un lampadaire.

Son attaque signature, *Jet Hémato*, projette un arc de sang corrosif et contaminé, qui inflige panique et malaise. Il possède aussi *Patate Réflexe*, une attaque incontrôlable qui s’active à la moindre tape sur l’épaule.`,
  types: [shlagemonTypes.combat],
  coefficient: 36,
  evolution: {
    base: coloscopie,
    condition: {
      type: 'lvl',
      value: 44,
    },
  },
}

export default ferosang
