import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const elektektonik: BaseShlagemon = {
  id: 'elektektonik',
  name: 'Elektektonik',
  description: `Toujours en train de danser la tecktonik, il électrise l'air autour de lui. Ses mouvements saccadés déclenchent de petites décharges qui font sauter les plombs partout où il passe.`,
  types: [shlagemonTypes.electrique],
  coefficient: 94,
}

export default elektektonik
