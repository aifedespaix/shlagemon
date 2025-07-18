import type { MiniGameDefinition } from '~/type/minigame'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useMiniGameStore } from '~/stores/miniGame'
import { sachatte } from './characters/sachatte'

export const ticTacToeMiniGame: MiniGameDefinition = {
  id: 'tictactoe',
  label: 'Tic Tac Toe',
  character: sachatte,
  component: () => import('~/components/minigame/TicTacToe.vue'),
  reward: 100,
  createIntro(start) {
    const miniGame = useMiniGameStore()
    const panel = useMainPanelStore()
    return [
      {
        id: 'start',
        text: 'Envie d\'une partie de morpion ?',
        responses: [
          { label: 'Oui', type: 'primary', action: start },
          {
            label: 'Non',
            type: 'danger',
            action: () => {
              miniGame.quit()
              panel.showVillage()
            },
          },
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

export const battleshipMiniGame: MiniGameDefinition = {
  id: 'battleship',
  label: 'Bataille Navale',
  character: sachatte,
  component: () => import('~/components/minigame/Battleship.vue'),
  reward: 'oeuf-eau',
  createIntro(start) {
    const miniGame = useMiniGameStore()
    const panel = useMainPanelStore()
    return [
      {
        id: 'start',
        text: 'Une partie de bataille navale ?',
        responses: [
          { label: 'Oui', type: 'primary', action: start },
          {
            label: 'Non',
            type: 'danger',
            action: () => {
              miniGame.quit()
              panel.showVillage()
            },
          },
        ],
      },
    ]
  },
  createSuccess(done) {
    return [
      {
        id: 'win',
        text: 'Victoire ! Tu gagnes un \u0153uf Eau.',
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

export const miniGames: MiniGameDefinition[] = [ticTacToeMiniGame, battleshipMiniGame]

export function getMiniGame(id: string): MiniGameDefinition | undefined {
  return miniGames.find(g => g.id === id)
}
