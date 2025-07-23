import type { MiniGameDefinition } from '~/type/minigame'
import { i18n } from '~/modules/i18n'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useMiniGameStore } from '~/stores/miniGame'
import { sachatte } from '../characters/sachatte'
import { grassEgg } from '../items/items'

export const ticTacToeMiniGame: MiniGameDefinition = {
  id: 'tictactoe',
  label: 'Tic Tac Toe',
  character: sachatte,
  component: () => import('~/components/minigame/TicTacToe.vue'),
  reward: { type: 'item', itemId: grassEgg.id },
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
        text: i18n.global.t('data.Minigame.TicTacToe.winText'),
        responses: [
          { label: i18n.global.t('data.Minigame.TicTacToe.super'), type: 'valid', action: done },
        ],
      },
    ]
  },
  createFailure(done) {
    const miniGame = useMiniGameStore()
    return [
      {
        id: 'fail',
        text: 'Perdu ! Recommence quand tu veux.',
        responses: [
          { label: 'Recommencer', type: 'primary', action: () => miniGame.play() },
          { label: 'Retour', type: 'danger', action: done },
        ],
      },
    ]
  },
}
