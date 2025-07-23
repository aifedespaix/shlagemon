import type { MiniGameDefinition } from '~/type/minigame'
import { i18n } from '~/modules/i18n'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useMiniGameStore } from '~/stores/miniGame'
import { donaldTrompe } from '../characters/donald-trompe'
import { fireEgg } from '../items/items'

export const connectFourMiniGame: MiniGameDefinition = {
  id: 'connectfour',
  label: 'Puissance 4',
  character: donaldTrompe,
  component: () => import('~/components/minigame/MiniGamePuissance4.vue'),
  reward: { type: 'item', itemId: fireEgg.id },
  createIntro(start) {
    const miniGame = useMiniGameStore()
    const panel = useMainPanelStore()
    return [
      {
        id: 'start',
        text: i18n.global.t('data.Minigame.ConnectFour.startText'),
        responses: [
          { label: i18n.global.t('data.Minigame.ConnectFour.yes'), type: 'primary', action: start },
          {
            label: i18n.global.t('data.Minigame.ConnectFour.no'),
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
        text: i18n.global.t('data.Minigame.ConnectFour.winText'),
        responses: [
          { label: i18n.global.t('data.Minigame.ConnectFour.super'), type: 'valid', action: done },
        ],
      },
    ]
  },
  createDraw(done) {
    const miniGame = useMiniGameStore()
    return [
      {
        id: 'draw',
        text: i18n.global.t('data.Minigame.ConnectFour.drawText'),
        responses: [
          { label: i18n.global.t('data.Minigame.ConnectFour.restart'), type: 'primary', action: () => miniGame.play() },
          { label: i18n.global.t('data.Minigame.ConnectFour.back'), type: 'danger', action: done },
        ],
      },
    ]
  },
  createFailure(done) {
    const miniGame = useMiniGameStore()
    return [
      {
        id: 'fail',
        text: i18n.global.t('data.Minigame.ConnectFour.loseText'),
        responses: [
          { label: i18n.global.t('data.Minigame.ConnectFour.restart'), type: 'primary', action: () => miniGame.play() },
          { label: i18n.global.t('data.Minigame.ConnectFour.back'), type: 'danger', action: done },
        ],
      },
    ]
  },
}
