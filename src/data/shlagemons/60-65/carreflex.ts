import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const CARREFLEX_DESCRIPTION = 'carreflex.description'

export const carreflex: BaseShlagemon = {
  id: 'carreflex',
  name: 'Carréflex',
  description: CARREFLEX_DESCRIPTION,
  descriptionKey: 'data.shlagemons.60-65.carreflex.description',
  types: [shlagemonTypes.normal],
  coefficient: 62,
}

export default carreflex
