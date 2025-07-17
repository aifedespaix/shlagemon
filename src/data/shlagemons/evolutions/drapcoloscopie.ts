import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const drapcoloscopie: BaseShlagemon = {
  id: 'drapcoloscopie',
  name: 'Drapcoloscopie',
  description: `Forme finale du DrapCon, ce drap géant se prend pour un médecin de l’obscur et fouille tout ce qui passe à sa portée.`,
  types: [shlagemonTypes.dragon, shlagemonTypes.vol],
  coefficient: 95,
}

export default drapcoloscopie
