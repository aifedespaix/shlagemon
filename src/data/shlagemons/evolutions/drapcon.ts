import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import drapcoloscopie from './drapcoloscopie'

export const drapcon: BaseShlagemon = {
  id: 'drapcon',
  name: 'DrapCon',
  description: `Cette étape intermédiaire se prend pour un grand drap majestueux mais reste aussi stupide que sa version minuscule.`,
  descriptionKey: 'data.shlagemons.evolutions.drapcon.description',
  types: [shlagemonTypes.dragon],
  evolution: {
    base: drapcoloscopie,
    condition: { type: 'lvl', value: 100 },
  },
}

export default drapcon
