import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import kaputrak from '../evolutions/kaputrak'

export const kraputo: BaseShlagemon = {
  id: 'kraputo',
  name: 'Kraputo',
  description: `Ce crabe éraflé se cache sous un casque cassé et offre ses pinces au plus offrant. Il raffole des fonds de verre et des pièces rouillées.`,
  descriptionKey: 'data.shlagemons.55-60.kraputo.description',
  types: [shlagemonTypes.roche, shlagemonTypes.eau],
  evolution: {
    base: kaputrak,
    condition: { type: 'lvl', value: 75 },
  },
}

export default kraputo
