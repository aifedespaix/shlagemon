import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import ectroudbal from '../evolutions/ectroudbal'

export const sperectum: BaseShlagemon = {
  id: 'sperectum',
  name: 'Sperectum',
  description: `Sperectum est la réincarnation d'un pet émis par un Shlagemon.`,
  types: [shlagemonTypes.spectre],
  coefficient: 26,
  evolution: {
    base: ectroudbal,
    condition: {
      type: 'lvl',
      value: 52,
    },
  },
}

export default sperectum
