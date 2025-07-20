import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const coxymort: BaseShlagemon = {
  id: 'coxymort',
  name: 'Coxymort',
  description: `Immense insecte décrépi, recouvert de résidus douteux, avec des tatouages au blanco et un regard perdu. Il claque des ailes sans raison.`,
  types: [shlagemonTypes.insecte, shlagemonTypes.poison],
  coefficient: 92,
}

export default coxymort
