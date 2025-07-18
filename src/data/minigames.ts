import type { MiniGameDefinition } from '~/type/minigame'
import { sachatte } from './characters/sachatte'

export const ticTacToeMiniGame: MiniGameDefinition = {
  id: 'tictactoe',
  label: 'Tic Tac Toe',
  character: sachatte,
  component: () => import('~/components/minigame/TicTacToe.vue'),
  reward: 100,
  createIntro(start, exit) {
    return [
      {
        id: 'start',
        text: 'Envie d\'une partie de morpion ?',
        responses: [
          { label: 'Oui', type: 'primary', action: start },
          { label: 'Non', type: 'danger', action: exit },
        ],
      },
    ]
  },
  createSuccess(done) {
    return [
      {
        id: 'win',
        text: 'Bien joué ! Tu gagnes 100 Shlagidolars.',
        responses: [
          { label: 'Super !', type: 'valid', action: done },
        ],
      },
    ]
  },
  createFailure(done) {
    return [
      {
        id: 'fail',
        text: 'Perdu ! Recommence quand tu veux.',
        responses: [
          { label: 'Retour', type: 'danger', action: done },
        ],
      },
    ]
  },
}

export const miniGames: MiniGameDefinition[] = [ticTacToeMiniGame]

export function getMiniGame(id: string): MiniGameDefinition | undefined {
  return miniGames.find(g => g.id === id)
}
