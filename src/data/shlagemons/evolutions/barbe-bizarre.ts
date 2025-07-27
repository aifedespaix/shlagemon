import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import { floripute } from './floripute'

export const barbeBizarre: BaseShlagemon = {
  id: 'barbe-bizarre',
  name: 'Barbebizarre',
  description: `Barbe Bizarre est l’évolution grotesquement majestueuse de Bulgrosboule. Il a troqué ses bulles fessières pour une barbe mousseuse qui dégouline en permanence, composée d’un mélange inconnu entre dentifrice périmé et savon d'hôtel volé. Malgré son air hagard et sa démarche traînante, il se prend très au sérieux, persuadé d'être l'élu d’une prophétie écrite sur un emballage de kebab.

Il parle en citations absurdes qu’il invente sur le moment (“si l’eau monte, c’est que t’es en bas”), et provoque ses adversaires à coups de bulles odorantes surgissant de son dos, appelées *Flatulence Mentale*. Son attaque signature, *Moussattaque*, étouffe ses ennemis sous une barbe si dense qu’on s’y perd physiquement et mentalement. On le trouve souvent en train de prêcher des paroles floues à des lampadaires.`,
  descriptionKey: 'data.shlagemons.evolutions.barbe-bizarre.description',

  types: [shlagemonTypes.plante],
  evolution: { base: floripute, condition: { type: 'lvl', value: 36 } },
}

export default barbeBizarre
