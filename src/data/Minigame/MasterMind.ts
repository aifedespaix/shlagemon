import type { MiniGameDefinition } from '~/type/minigame'
import { i18n } from '~/modules/i18n'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useMiniGameStore } from '~/stores/miniGame'
import { emilieLouise } from '../characters/emilie-louise'
import { psyEgg } from '../items'

export const shlagMindMiniGame: MiniGameDefinition = {
  id: 'shlagmind',
  label: 'Mastermind Shlagémon',
  character: emilieLouise,
  component: () => import('~/components/minigame/MasterMind.vue'),
  reward: { type: 'item', itemId: psyEgg.id },
  createIntro(start) {
    const miniGame = useMiniGameStore()
    const panel = useMainPanelStore()
    return [
      {
        id: 'start',
        text: i18n.global.t('data.Minigame.ShlagMind.startText'),
        responses: [
          { label: i18n.global.t('data.Minigame.ShlagMind.yes'), type: 'primary', action: start },
          {
            label: i18n.global.t('data.Minigame.ShlagMind.no'),
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
        text: i18n.global.t('data.Minigame.ShlagMind.winText'),
        responses: [
          { label: i18n.global.t('data.Minigame.ShlagMind.super'), type: 'valid', action: done },
        ],
      },
    ]
  },
  createFailure(done) {
    const miniGame = useMiniGameStore()
    return [
      {
        id: 'fail',
        text: i18n.global.t('data.Minigame.ShlagMind.loseText'),
        responses: [
          { label: i18n.global.t('data.Minigame.ShlagMind.restart'), type: 'primary', action: () => miniGame.play() },
          { label: i18n.global.t('data.Minigame.ShlagMind.back'), type: 'danger', action: done },
        ],
      },
    ]
  },
}
