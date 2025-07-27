import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const elektektonik: BaseShlagemon = {
  id: 'elektektonik',
  name: 'Elektektonik',
  description: `Toujours en train de danser la tecktonik, il électrise l'air autour de lui. Ses mouvements saccadés déclenchent de petites décharges qui font sauter les plombs partout où il passe.`,
  descriptionKey: 'data.shlagemons.90-95.elektektonik.description',
  types: [shlagemonTypes.electrique],
  speciality: 'unique',
}
export default elektektonik
