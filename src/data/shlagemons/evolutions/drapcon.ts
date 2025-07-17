import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'
import drapcoloscopie from './drapcoloscopie'

export const drapcon: BaseShlagemon = {
  id: 'drapcon',
  name: 'DrapCon',
  description: `Cette étape intermédiaire se prend pour un grand drap majestueux mais reste aussi stupide que sa version minuscule.`,
  types: [shlagemonTypes.dragon],
  coefficient: 88,
  evolution: {
    base: drapcoloscopie,
    condition: { type: 'lvl', value: 100 },
  },
}

export default drapcon
