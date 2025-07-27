import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import hypsedentaire from '../evolutions/hypsedentaire'

export const soporifiak: BaseShlagemon = {
  id: 'soporifiak',
  name: 'Soporifiak',
  description: `Soporifiak roupille partout où il passe et son postérieur disproportionné lui sert d’oreiller improvisé. Il charme les passants en promettant des siestes miraculeuses avant de s’endormir lui-même en plein milieu de la conversation.`,
  descriptionKey: 'data.shlagemons.70-75.soporifiak.description',
  types: [shlagemonTypes.psy],
  evolution: {
    base: hypsedentaire,
    condition: { type: 'lvl', value: 78 },
  },
  speciality: 'evolution0',
}
export default soporifiak
