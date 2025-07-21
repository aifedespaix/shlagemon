import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import amonitrace from '../evolutions/amonitrace'

export const amonichiasse: BaseShlagemon = {
  id: 'amonichiasse',
  name: 'Amonichiasse',
  description: `Amonichiasse est un mollusque fossilisé qui pue la diarrhée aquatique. Sa coquille gluante est couverte de taches brunâtres, comme si elle avait été utilisée comme seau de secours dans une gastro collective. Deux petits yeux globuleux dépassent mollement de son mucus, constamment embués par la vapeur tiède qu’il dégage. Il avance lentement, en laissant derrière lui une traînée suspecte et visqueuse. Certains dresseurs affirment qu’il émet des bruits de gargouillis intestinaux quand on le secoue trop fort.`,
  descriptionKey: 'data.shlagemons.55-60.amonichiasse.description',
  types: [shlagemonTypes.roche, shlagemonTypes.eau],
  coefficient: 57,
  evolution: {
    base: amonitrace,
    condition: { type: 'lvl', value: 72 },
  },
}

export default amonichiasse
