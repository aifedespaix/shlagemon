import type { BaseShlagemon } from '../types/shlagemon'
import { flanquant, plastoc, vapotonie } from './shlagemons-type'

export const carapouffe: BaseShlagemon = {
  id: 'carapouffe',
  name: 'Carapouffe',
  color: '#333388',
  description: 'Carapouffe est une Shlagémone semi-enfoncée dans sa carapace.',
  type: plastoc,
}

export const salamiches: BaseShlagemon = {
  id: 'salamiches',
  name: 'Salamiches',
  color: '#ff5533',
  description: 'Salamiches rote du feu quand il mange du pain.',
  type: flanquant,
}

export const bulgrosboule: BaseShlagemon = {
  id: 'bulgrosboule',
  name: 'Bulgrosboule',
  color: '#88ccff',
  description: 'Bulgrosboule est connu pour ses fesses titanesques.',
  type: vapotonie,
}

export const starters: BaseShlagemon[] = [carapouffe, salamiches, bulgrosboule]
