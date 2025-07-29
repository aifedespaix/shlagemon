import type { MiniGameDefinition } from '~/type/minigame'
import { i18n } from '~/modules/i18n'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useMiniGameStore } from '~/stores/miniGame'
import { profMerdant } from '../characters/prof-merdant'
import { psyEgg } from '../items'

export const shlagPairsMiniGame: MiniGameDefinition = {
  id: 'shlagpairs',
  label: 'Shlag Pairs',
  character: profMerdant,
  component: () => import('~/components/minigame/Pairs.vue'),
  reward: { type: 'item', itemId: psyEgg.id },
  createIntro(start) {
    const miniGame = useMiniGameStore()
    const panel = useMainPanelStore()
    return [
      {
        id: 'start',
        text: i18n.global.t('data.Minigame.Pairs.startText'),
        responses: [
          { label: i18n.global.t('data.Minigame.Pairs.yes'), type: 'primary', action: start },
          {
            label: i18n.global.t('data.Minigame.Pairs.no'),
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
        text: i18n.global.t('data.Minigame.Pairs.winText'),
        responses: [
          { label: i18n.global.t('data.Minigame.Pairs.super'), type: 'valid', action: done },
        ],
      },
    ]
  },
  createFailure(done) {
    const miniGame = useMiniGameStore()
    return [
      {
        id: 'fail',
        text: i18n.global.t('data.Minigame.Pairs.loseText'),
        responses: [
          { label: i18n.global.t('data.Minigame.Pairs.restart'), type: 'primary', action: () => miniGame.play() },
          { label: i18n.global.t('data.Minigame.Pairs.back'), type: 'danger', action: done },
        ],
      },
    ]
  },
}
