import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import nidoqueer from './nidoqueer'

export const nidoschneck: BaseShlagemon = {
  id: 'nidoschneck',
  name: 'data.shlagemons.evolutions.nidoschneck.name',
  description: 'data.shlagemons.evolutions.nidoschneck.description',
  types: [shlagemonTypes.poison],

  evolution: {
    base: nidoqueer,
    condition: {
      type: 'lvl',
      value: 88,
    },
  },
  speciality: 'evolution1',
}
export default nidoschneck
