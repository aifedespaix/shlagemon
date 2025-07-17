import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const lokhlash: BaseShlagemon = {
  id: 'lokhlash',
  name: 'Lokhlash',
  description: `Lokhlash adore participer à des battles de rap improvisées sur son dos. Il navigue de scène en scène, lâchant des punchlines glaciales qui font frissonner l'auditoire.`,
  types: [shlagemonTypes.eau, shlagemonTypes.glace],
  coefficient: 100,
}

export default lokhlash
