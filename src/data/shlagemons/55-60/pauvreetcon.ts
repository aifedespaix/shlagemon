import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const pauvreetcon: BaseShlagemon = {
  id: 'pauvreetcon',
  name: 'Pauvreetcon',
  description: `Pauvreetcon est un amas de polygones bancals issu d’un bug informatique. Il flotte maladroitement en cherchant sa connexion Wi-Fi et affiche de temps en temps un écran bleu en guise de cri.`,
  types: [shlagemonTypes.normal],
  coefficient: 56,
}

export default pauvreetcon
