import type { MiniGameDefinition } from '~/type/minigame'
import { i18n } from '~/modules/i18n'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useMiniGameStore } from '~/stores/miniGame'
import { norman } from '../characters/norman'
import { thunderEgg } from '../items'

export const shlagTaquinMiniGame: MiniGameDefinition = {
  id: 'taquin',
  label: 'Taquin',
  character: norman,
  component: () => import('~/components/minigame/Taquin.vue'),
  reward: { type: 'item', itemId: thunderEgg.id },
  createIntro(start) {
    const miniGame = useMiniGameStore()
    const panel = useMainPanelStore()
    return [
      {
        id: 'start',
        text: i18n.global.t('data.Minigame.Taquin.startText'),
        responses: [
          { label: i18n.global.t('data.Minigame.Taquin.yes'), type: 'primary', action: start },
          {
            label: i18n.global.t('data.Minigame.Taquin.no'),
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
        text: i18n.global.t('data.Minigame.Taquin.winText'),
        responses: [
          { label: i18n.global.t('data.Minigame.Taquin.super'), type: 'valid', action: done },
        ],
      },
    ]
  },
  createFailure(done) {
    const miniGame = useMiniGameStore()
    return [
      {
        id: 'fail',
        text: i18n.global.t('data.Minigame.Taquin.loseText'),
        responses: [
          { label: i18n.global.t('data.Minigame.Taquin.restart'), type: 'primary', action: () => miniGame.play() },
          { label: i18n.global.t('data.Minigame.Taquin.back'), type: 'danger', action: done },
        ],
      },
    ]
  },
}
