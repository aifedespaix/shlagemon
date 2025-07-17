import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import kaputrak from '../evolutions/kaputrak'

export const kraputo: BaseShlagemon = {
  id: 'kraputo',
  name: 'Kraputo',
  description: `Ce crabe éraflé se cache sous un casque cassé et offre ses pinces au plus offrant. Il raffole des fonds de verre et des pièces rouillées.`,
  types: [shlagemonTypes.roche, shlagemonTypes.eau],
  coefficient: 58,
  evolution: {
    base: kaputrak,
    condition: { type: 'lvl', value: 75 },
  },
}

export default kraputo
