import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const magmaretfred: BaseShlagemon = {
  id: 'magmaretfred',
  name: 'Magmaretfred',
  description: `Toujours en duo imaginaire avec son compère absent, Magmaretfred crache des flammes en récitant des blagues douteuses. Il chauffe l'ambiance mais finit souvent seul sur scène.`,
  types: [shlagemonTypes.feu],
  coefficient: 96,
}

export default magmaretfred
