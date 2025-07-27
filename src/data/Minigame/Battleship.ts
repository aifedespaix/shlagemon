import type { MiniGameDefinition } from '~/type/minigame'
import { i18n } from '~/modules/i18n'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useMiniGameStore } from '~/stores/miniGame'
import { vladimirPutain } from '../characters/vladimir-putain'
import { waterEgg } from '../items'

export const battleshipMiniGame: MiniGameDefinition = {
  id: 'battleship',
  label: 'Bataille Navale',
  character: vladimirPutain,
  component: () => import('~/components/minigame/Battleship.vue'),
  reward: { type: 'item', itemId: waterEgg.id },
  createIntro(start) {
    const miniGame = useMiniGameStore()
    const panel = useMainPanelStore()
    return [
      {
        id: 'start',
        text: i18n.global.t('data.Minigame.Battleship.startText'),
        responses: [
          { label: i18n.global.t('data.Minigame.Battleship.yes'), type: 'primary', action: start },
          {
            label: i18n.global.t('data.Minigame.Battleship.no'),
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
        text: i18n.global.t('data.Minigame.Battleship.winText'),
        responses: [
          { label: i18n.global.t('data.Minigame.Battleship.super'), type: 'valid', action: done },
        ],
      },
    ]
  },
  createFailure(done) {
    const miniGame = useMiniGameStore()
    return [
      {
        id: 'fail',
        text: i18n.global.t('data.Minigame.Battleship.loseText'),
        responses: [
          { label: i18n.global.t('data.Minigame.Battleship.restart'), type: 'primary', action: () => miniGame.play() },
          { label: i18n.global.t('data.Minigame.Battleship.back'), type: 'danger', action: done },
        ],
      },
    ]
  },
}
