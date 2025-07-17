import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const carreflex: BaseShlagemon = {
  id: 'carreflex',
  name: 'Carréflex',
  description: `Carréflex est un colosse tout en angles qui dort généralement en plein milieu de la route. Sa forme cubique lui permet de bloquer même les camions.`,
  types: [shlagemonTypes.normal],
  coefficient: 62,
}

export default carreflex
