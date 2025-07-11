import type { Character } from '~/type/character'
import type { Trainer } from '~/types'
import { carapouffe } from './shlagemons/carapouffe'
import { salamiches } from './shlagemons/salamiches'

const bobCharacter: Character = {
  id: 'prof-merdant',
  name: 'Bob le Déglingué',
  gender: 'male',
}

export const trainers: Trainer[] = [
  {
    id: 'bob',
    character: bobCharacter,
    dialogBefore: 'Prépare-toi à manger la poussière !',
    dialogAfter: 'Pas possible... tu m\'as battu !',
    reward: 3,
    shlagemons: [
      { baseId: carapouffe.id, level: 3 },
      { baseId: salamiches.id, level: 4 },
    ],
  },
]
