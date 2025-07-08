import type { Arena } from '~/type'
import { profMerdant } from './characters/prof-merdant'
import aspigros from './shlagemons/aspigros'
import { canarchichon } from './shlagemons/canarchichon'
import chenipaon from './shlagemons/chenipaon'
import { rouxPasCool } from './shlagemons/rouxPasCool'
import { sacdepates } from './shlagemons/sacdepates'
import { sperectum } from './shlagemons/sperectum'

export const arenas: Arena[] = [
  {
    id: 'village-veaux-du-gland',
    character: profMerdant,
    level: 21,
    badge: {
      id: 'badge-merdant',
      name: 'Badge Merdant',
      levelCap: 40,
      image: '',
    },
    lineup: [
      sacdepates,
      rouxPasCool,
      canarchichon,
      sperectum,
      aspigros,
      chenipaon,
    ],
  },
]

export function getArena(id: string): Arena | undefined {
  return arenas.find(a => a.id === id)
}
