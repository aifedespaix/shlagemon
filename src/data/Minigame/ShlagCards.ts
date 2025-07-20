import type { MiniGameDefinition } from '~/type/minigame'
import { i18n } from '~/modules/i18n'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useMiniGameStore } from '~/stores/miniGame'
import { sachatte } from '../characters/sachatte'
import { psyEgg } from '../items/items'

export const shlagCardsMiniGame: MiniGameDefinition = {
  id: 'shlagcards',
  label: 'Duel de Cartes',
  character: sachatte,
  component: () => import('~/components/minigame/MiniGameShlagCards.vue'),
  reward: { type: 'item', itemId: psyEgg.id },
  createIntro(start) {
    const miniGame = useMiniGameStore()
    const panel = useMainPanelStore()
    return [
      {
        id: 'start',
        text: i18n.global.t('data.minigame.shlagcards.startText'),
        responses: [
          { label: i18n.global.t('data.minigame.shlagcards.yes'), type: 'primary', action: start },
          {
            label: i18n.global.t('data.minigame.shlagcards.no'),
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
        text: i18n.global.t('data.minigame.shlagcards.winText'),
        responses: [
          { label: i18n.global.t('data.minigame.shlagcards.super'), type: 'valid', action: done },
        ],
      },
    ]
  },
  createFailure(done) {
    return [
      {
        id: 'fail',
        text: i18n.global.t('data.minigame.shlagcards.loseText'),
        responses: [
          { label: i18n.global.t('data.minigame.shlagcards.back'), type: 'danger', action: done },
        ],
      },
    ]
  },
}
