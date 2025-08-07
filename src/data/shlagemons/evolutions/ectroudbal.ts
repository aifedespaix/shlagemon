import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const ectroudbal: BaseShlagemon = {
  id: 'ectroudbal',
  name: 'data.shlagemons.evolutions.ectroudbal.name',
  description: 'data.shlagemons.evolutions.ectroudbal.description',
  types: [shlagemonTypes.spectre, shlagemonTypes.poison],
  speciality: 'evolution2',
}
export default ectroudbal
