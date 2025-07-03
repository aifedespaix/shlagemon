import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const sacdepates: BaseShlagemon = {
  id: 'sacdepates',
  name: 'Sac de Pâtes',
  description: `Sac de Pâtes est une boule vivante de spaghettis emmêlés, dont les longs brins forment un labyrinthe mouvant. Doté de deux yeux perçants incrustés au milieu de ses pâtes, il intimide quiconque croise son regard infernal. Ses pieds rouges, lisses et luisants, lui permettent de rouler à toute vitesse sur ses adversaires, qu’il écrase sans pitié dans un rire aigu et diabolique. Il passe ses journées à se peigner minutieusement avec un peigne fin, espérant un jour démêler le nœud infini qu’il est devenu. On raconte que plus ses spaghettis sont emmêlés, plus il devient redoutable. Talent : Nœud Fatal — Quand Sacdepâtes subit une attaque physique, il peut s’enrouler autour de l’ennemi pour le piéger et l’immobiliser.`,
  types: [shlagemonTypes.plante],
  coefficient: 2,
}

export default sacdepates
