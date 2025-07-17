import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const pacifikin: BaseShlagemon = {
  id: 'pacifikin',
  name: 'Pacifikin',
  description: `Cet oiseau glacé passe son temps à chercher un océan paisible pour hiberner. Sa présence refroidit l’atmosphère et calme les plus agressifs.`,
  types: [shlagemonTypes.glace, shlagemonTypes.vol],
  coefficient: 63,
}

export default pacifikin
