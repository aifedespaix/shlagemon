import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const amonitrace: BaseShlagemon = {
  id: 'amonitrace',
  name: 'Amonitrace',
  description: `Amonitrace est la forme décadente d’Amonichiasse. Sa coquille porte des traces suspectes et il tente de glisser loin des regards embarrassés.`,
  types: [shlagemonTypes.roche, shlagemonTypes.eau],
  coefficient: 72,
}

export default amonitrace
