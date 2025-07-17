import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const ptitrat: BaseShlagemon = {
  id: 'ptitrat',
  name: 'Ptitrat',
  description: `Ancien régne fossile au museau pointu, Ptitrat se prend pour un rongeur volant. Sa peau grisâtre s’effrite un peu plus à chaque battement d’aile.`,
  types: [shlagemonTypes.roche, shlagemonTypes.vol],
  coefficient: 59,
}

export default ptitrat
