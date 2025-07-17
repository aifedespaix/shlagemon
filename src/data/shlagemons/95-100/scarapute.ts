import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const scarapute: BaseShlagemon = {
  id: 'scarapute',
  name: 'Scarapute',
  description: `Cet insecte adore sucer le sang des voyageurs imprudents. On le voit souvent roder près des campings à la recherche d'un mollet juteux.`,
  types: [shlagemonTypes.insecte],
  coefficient: 97,
}

export default scarapute
