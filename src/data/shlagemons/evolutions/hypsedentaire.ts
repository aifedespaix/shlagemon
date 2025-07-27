import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const hypsedentaire: BaseShlagemon = {
  id: 'hypsedentaire',
  name: 'Hypsedentaire',
  description: `Hypsedentaire a développé un pouvoir hypnotique tellement fort qu'il préfère rester affalé chez lui. Il endort ses ennemis à distance pour ne jamais avoir à se lever.`,
  descriptionKey: 'data.shlagemons.evolutions.hypsedentaire.description',
  types: [shlagemonTypes.psy],
  speciality: 'evolution1',
}
export default hypsedentaire
