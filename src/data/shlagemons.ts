export interface ShlagemonType {
  id: string
  name: string
  description: string
  color: string
}

export interface BaseShlagemon {
  id: string
  name: string
  color: string
  description: string
  type: ShlagemonType
}

export const plastoc: ShlagemonType = {
  id: 'plastoc',
  name: 'Plastoc',
  description: 'Type synthétique peu écologique',
  color: '#e86fda',
}

export const flanquant: ShlagemonType = {
  id: 'flanquant',
  name: 'Flanquant',
  description: 'Type gluant et instable',
  color: '#ffcc88',
}

export const vapotonie: ShlagemonType = {
  id: 'vapotonie',
  name: 'Vapotage',
  description: 'Type intangible et toxique',
  color: '#b6d6f2',
}

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
