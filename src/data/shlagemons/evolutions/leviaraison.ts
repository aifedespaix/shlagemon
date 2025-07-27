import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const leviaraison: BaseShlagemon = {
  id: 'leviaraison',
  name: 'Léviaraison',
  description: `Toujours persuadé d'avoir raison, ce serpent de mer géant fulmine dès qu'on le contredit. Ses colères déclenchent des tempêtes monumentales.`,
  descriptionKey: 'data.shlagemons.evolutions.leviaraison.description',
  types: [shlagemonTypes.eau, shlagemonTypes.vol],
}

export default leviaraison
