import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import amonitrace from '../evolutions/amonitrace'

export const amonichiasse: BaseShlagemon = {
  id: 'amonichiasse',
  name: 'Amonichiasse',
  description: `Ce mollusque fossilisé traîne une coquille couverte de taches douteuses. Il dégage une odeur de cave humide et de gastro chronique.`,
  types: [shlagemonTypes.roche, shlagemonTypes.eau],
  coefficient: 57,
  evolution: {
    base: amonitrace,
    condition: { type: 'lvl', value: 72 },
  },
}

export default amonichiasse
