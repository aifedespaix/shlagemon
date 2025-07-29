import type { BaseShlagemon } from '~/type'
import { defibrillator, lighter, pissBottle } from '~/data/items'
import { shlagemonTypes } from '../../shlagemons-type'
import pyrolise from '../evolutions/pyrolise'
import salmoneli from '../evolutions/salmoneli'
import tuberculi from '../evolutions/tuberculi'

export const emboli: BaseShlagemon = {
  id: 'emboli',
  name: 'Emboli',
  description: 'data.shlagemons.10-15.emboli.description',
  types: [shlagemonTypes.poison],
  evolutions: [
    { base: pyrolise, condition: { type: 'item', value: lighter } },
    { base: salmoneli, condition: { type: 'item', value: pissBottle } },
    { base: tuberculi, condition: { type: 'item', value: defibrillator } },
  ],
  speciality: 'evolution0',
}
export default emboli
