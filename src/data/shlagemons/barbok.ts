import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const barbok: BaseShlagemon = {
  id: 'barbok',
  name: 'Barbok',
  description: `Barbok est la forme évoluée d’Amoche, devenue plus imposante, plus poilue… et surtout plus fière de sa barbe que de ses capacités de combat. Sa pilosité faciale est incohérente et pousse jusqu’au bout de ses écailles. Il passe un temps démesuré à la peigner avec sa langue bifide, convaincu qu’elle lui donne +12 en charisme.

Ancien joueur de Iop sur un vieux serveur oublié, il croit toujours qu’il a un rôle crucial dans le combat, même s’il passe plus de temps à commenter les tours qu’à les jouer. Ses attaques sont bruyantes et peu efficaces, comme *Coup d'Barbe*, qui inflige des dégâts très moyens mais provoque parfois un saignement de honte chez l’adversaire.`,
  types: [shlagemonTypes.poison],
  coefficient: 43,
}

export default barbok
