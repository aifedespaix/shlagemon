import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const sperectum: BaseShlagemon = {
  id: 'sperectum',
  name: 'Sperectum',
  description: `Sperectum est la réincarnation d'un pet émis par un Shlagemon.`,
  types: [shlagemonTypes.spectre],
  coefficient: 3,
}

export default sperectum
