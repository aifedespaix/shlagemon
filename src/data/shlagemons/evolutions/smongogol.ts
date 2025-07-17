import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const smongogol: BaseShlagemon = {
  id: 'smongogol',
  name: 'Smongogol',
  description: `Toujours plus imbécile et plus toxique que Smongol, Smongogol libère un nuage épais qui empeste la débilité. On le confond souvent avec un vieux pneu en feu.`,
  types: [shlagemonTypes.poison],
  coefficient: 90,
}

export default smongogol
