import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const rhinoplastie: BaseShlagemon = {
  id: 'rhinoplastie',
  name: 'Rhinoplastie',
  description: `Après une chirurgie esthétique ratée, Rhinoplastie a la face entièrement remodelée. Il fait peur à tout le monde mais se trouve magnifique.`,
  descriptionKey: 'data.shlagemons.evolutions.rhinoplastie.description',
  types: [shlagemonTypes.sol, shlagemonTypes.roche],
  speciality: 'evolution1',
}
export default rhinoplastie
