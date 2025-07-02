import type { Trainer } from '~/types'
import { carapouffe } from './shlagemons/carapouffe'
import { salamiches } from './shlagemons/salamiches'

export const trainers: Trainer[] = [
  {
    id: 'bob',
    name: 'Bob le Déglingué',
    image: '/characters/professor/professor.png',
    dialogBefore: 'Prépare-toi à manger la poussière !',
    dialogAfter: 'Pas possible... tu m\'as battu !',
    reward: 3,
    shlagemons: [
      { baseId: carapouffe.id, level: 3 },
      { baseId: salamiches.id, level: 4 },
    ],
  },
]
