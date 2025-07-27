import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import noctedard from '../evolutions/noctedard'

export const houlard: BaseShlagemon = {
  id: 'houlard',
  name: 'Houlard',
  description: `Petit hibou shooté, avec un seul œil rouge qui tourne. Pose sur des poteaux EDF, lâche des fientes phosphorescentes.`,
  descriptionKey: 'data.shlagemons.60-65.houlard.description',
  types: [shlagemonTypes.vol, shlagemonTypes.psy],
  coefficient: 63,
  evolutions: [{
    base: noctedard,
    condition: { type: 'lvl', value: 80 },
  }],
}

export default houlard
