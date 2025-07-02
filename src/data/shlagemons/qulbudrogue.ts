import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const qulbudrogue: BaseShlagemon = {
  id: 'qulbudrogue',
  name: 'Qulbudrogué',
  color: '#d4b05c',
  description: `Qulbudrogué est connu pour son attitude détendue et sa démarche nonchalante. Il donne l’impression d’être dans un état de réflexion constante… ou complètement à l’ouest. Il se balade en sifflotant des sons qu’il est probablement le seul à comprendre. On raconte qu’il voit la vie en "slow motion" et qu’il communique avec les autres Pokémon par télépathie — mais uniquement quand il en a envie, c’est-à-dire rarement.`,
  types: [shlagemonTypes.psy],
  coefficient: 3,
}

export default qulbudrogue
