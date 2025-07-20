import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import moisanium from './moisanium'

export const beuleef: BaseShlagemon = {
  id: 'beuleef',
  name: 'Beuleef',
  description: `Elle porte une écharpe en mousse moisie autour du cou. Se plaint tout le temps et attire les limaces.`,
  types: [shlagemonTypes.plante],
  coefficient: 78,
  evolution: {
    base: moisanium,
    condition: { type: 'lvl', value: 92 },
  },
}

export default beuleef
