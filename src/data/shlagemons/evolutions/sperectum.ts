import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import ectroudbal from './ectroudbal'

export const sperectum: BaseShlagemon = {
  id: 'sperectum',
  name: 'Sperectum',
  description: `Sperectum est la réincarnation d'un pet émis par un Shlagemon.`,
  descriptionKey: 'data.shlagemons.evolutions.sperectum.description',
  types: [shlagemonTypes.spectre],
  coefficient: 26,
  evolutions: [{
    base: ectroudbal,
    condition: {
      type: 'lvl',
      value: 52,
    },
  }],
}

export default sperectum
