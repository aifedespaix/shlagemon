import type { MiniGameDefinition } from '~/type/minigame'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useMiniGameStore } from '~/stores/miniGame'
import { sachatte } from '../characters/sachatte'
import { fireEgg } from '../items/items'

export const connectFourMiniGame: MiniGameDefinition = {
  id: 'connectfour',
  label: 'Puissance 4',
  character: sachatte,
  component: () => import('~/components/minigame/MiniGamePuissance4.vue'),
  reward: { type: 'item', itemId: fireEgg.id },
  createIntro(start) {
    const miniGame = useMiniGameStore()
    const panel = useMainPanelStore()
    return [
      {
        id: 'start',
        text: $t('data.minigame.connectFour.startText'),
        responses: [
          { label: $t('data.minigame.connectFour.yes'), type: 'primary', action: start },
          {
            label: $t('data.minigame.connectFour.no'),
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
        text: $t('data.minigame.connectFour.winText'),
        responses: [
          { label: $t('data.minigame.connectFour.super'), type: 'valid', action: done },
        ],
      },
    ]
  },
  createFailure(done) {
    return [
      {
        id: 'fail',
        text: $t('data.minigame.connectFour.loseText'),
        responses: [
          { label: $t('data.minigame.connectFour.back'), type: 'danger', action: done },
        ],
      },
    ]
  },
}
