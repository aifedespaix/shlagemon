import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const stabiscarosse: BaseShlagemon = {
  id: 'stabiscarosse',
  name: 'Stabiscarosse',
  description: `Parti s'installer à Biscarrosse pour profiter des vagues, ce Shlagémon se pavane désormais avec une planche de surf sous chaque bras.`,
  types: [shlagemonTypes.eau, shlagemonTypes.psy],
  coefficient: 94,
}

export default stabiscarosse
