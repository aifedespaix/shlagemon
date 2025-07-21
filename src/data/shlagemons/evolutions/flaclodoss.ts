import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const flaclodoss: BaseShlagemon = {
  id: 'flaclodoss',
  name: 'Flaclodoss',
  description: `Flaclodoss erre le long des caniveaux, traînant sa carapace devenue sac de couchage miteux, constellé de tâches suspectes et de chewing-gums écrasés. Jadis promis à une belle évolution, il s’est fait recaler à toutes les arènes et a fini par élire domicile sous un abribus, là où les flaques de pluie deviennent son miroir de fortune.

Sa fourrure a viré au gris sale, son regard flotte dans le vague comme s’il cherchait le bus qui ne viendra jamais. Sur son dos, on trouve une vieille boîte de conserve rouillée ou un pneu dégonflé, vestige de ses galères urbaines. Son jogging est devenu couverture, ses chaussettes dépareillées tiennent miraculeusement grâce à trois agrafes et un élastique récupéré sur un ticket de métro périmé.

Son attaque signature, *Nuage de Misère*, dégage une aura de fatigue et de vieux sandwichs, plongeant ses adversaires dans un état de démotivation intense.

On raconte que Flaclodoss possède le secret pour ouvrir toutes les poubelles à un seul doigt, et qu’il médite souvent sur la vie en fixant les pigeons. Sa philosophie ? “Tant qu’il y a un banc, y’a de l’espoir…”`,
  descriptionKey: 'data.shlagemons.evolutions.flaclodoss.description',
  types: [shlagemonTypes.eau, shlagemonTypes.psy],
  coefficient: 71,
}

export default flaclodoss
