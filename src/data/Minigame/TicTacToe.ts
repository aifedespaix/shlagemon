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
        text: i18n.global.t('data.Minigame.TicTacToe.startText'),
        responses: [
          { label: i18n.global.t('data.Minigame.TicTacToe.yes'), type: 'primary', action: start },
          {
            label: i18n.global.t('data.Minigame.TicTacToe.no'),
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
        text: i18n.global.t('data.Minigame.TicTacToe.loseText'),
        responses: [
          { label: i18n.global.t('data.Minigame.TicTacToe.restart'), type: 'primary', action: () => miniGame.play() },
          { label: i18n.global.t('data.Minigame.TicTacToe.back'), type: 'danger', action: done },
        ],
      },
    ]
  },
}
