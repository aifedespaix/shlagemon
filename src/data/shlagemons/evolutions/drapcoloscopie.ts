import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const drapcoloscopie: BaseShlagemon = {
  id: 'drapcoloscopie',
  name: 'Drapcoloscopie',
  description: `Forme finale du DrapCon, ce drap géant se prend pour un médecin de l’obscur et fouille tout ce qui passe à sa portée.`,
  descriptionKey: 'data.shlagemons.evolutions.drapcoloscopie.description',
  types: [shlagemonTypes.dragon, shlagemonTypes.vol],
}

export default drapcoloscopie
