import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const coxymort: BaseShlagemon = {
  id: 'coxymort',
  name: 'data.shlagemons.evolutions.coxymort.name',
  description: 'data.shlagemons.evolutions.coxymort.description',
  types: [shlagemonTypes.insecte, shlagemonTypes.poison],
  speciality: 'evolution2',
}
export default coxymort
