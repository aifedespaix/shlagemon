import type { Arena } from '~/type'
import { profMerdant } from './characters/prof-merdant'

import ptitocard from './shlagemons/05-10/ptitocard'
import goubite from './shlagemons/15-20/goubite'
import piafsansbec from './shlagemons/25-30/piafsansbec'
import canarchicon from './shlagemons/30-35/canarchicon'
import alakalbar from './shlagemons/evolutions/alakalbar'
import chrysachier from './shlagemons/evolutions/chrysachier'
import coconnul from './shlagemons/evolutions/coconnul'
import nosferasta from './shlagemons/evolutions/nosferachid'
import raptorincel from './shlagemons/evolutions/raptorincel'
import ratartine from './shlagemons/evolutions/ratartine'
import rouxScoop from './shlagemons/evolutions/roux-scoop'

export const arena20: Arena = {
  id: 'arena20',
  character: profMerdant,
  level: 21,
  badge: {
    id: 'badge-merdant',
    name: 'Badge Merdant',
    levelCap: 40,
    image: '',
  },
  lineup: [
    goubite,
    nosferasta,
    rouxScoop,
    coconnul,
    chrysachier,
    alakalbar,
  ],
}

export const arena40: Arena = {
  id: 'arena40',
  character: profMerdant,
  level: 21,
  badge: {
    id: 'badge-merdant',
    name: 'Badge Merdant',
    levelCap: 40,
    image: '',
  },
  lineup: [
    nosferasta,
    piafsansbec,
    canarchicon,
    ptitocard,
    raptorincel,
    ratartine,
  ],
}

export const arenas: Arena[] = [
  arena20,
  arena40,
]

export function getArena(id: string): Arena | undefined {
  return arenas.find(a => a.id === id)
}
