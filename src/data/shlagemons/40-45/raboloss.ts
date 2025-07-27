import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import flaclodoss from '../evolutions/flaclodoss'

export const raboloss: BaseShlagemon = {
  id: 'raboloss',
  name: 'Raboloss',
  description: `Raboloss erre lentement dans la cour de récré, traînant ses baskets trouées et son jogging trop grand qu'il a récupéré dans un carton discount. Sa fourrure autrefois rose est devenue terne, mouchetée de taches douteuses et de pellicules. Toujours l'air un peu perdu, il garde les yeux rivés au sol, espérant qu'on ne le remarque pas... mais évidemment, il attire tous les regards, surtout ceux des autres shlagémons qui le prennent pour cible.

Avec son expression de poisson-panique et son vieux sac à dos déchiré, il traîne une réputation de boloss ultime. Personne ne connaît la véritable couleur de son pull (il l’a hérité de 3 générations de schlags), et sa coiffure rappelle les matins pluvieux où l’on préfère rester sous la couette.

Son attaque signature, *Gros Lancer de Cartable*, consiste à balancer son sac (qui sent la cantine froide et la misère) sur ses adversaires, infligeant confusion et gêne sociale.

On raconte qu’il rêve, dans ses rares moments d’éveil, de devenir populaire... ou au moins d’avoir un goûter entier pour lui tout seul.`,
  descriptionKey: 'data.shlagemons.40-45.raboloss.description',
  types: [shlagemonTypes.eau, shlagemonTypes.psy],
  evolution: {
    base: flaclodoss,
    condition: {
      type: 'lvl',
      value: 67,
    },
  },
}

export default raboloss
