import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const elecgorr: BaseShlagemon = {
  id: 'elecgorr',
  name: 'ElecGorr',
  description: `Toujours chargé électriquement, ElecGorr arbore un regard menaçant et semble attiré par tout ce qui fait des étincelles.`,
  types: [shlagemonTypes.electrique, shlagemonTypes.vol],
  coefficient: 64,
}

export default elecgorr
