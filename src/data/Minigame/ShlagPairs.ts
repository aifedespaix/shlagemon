import type { MiniGameDefinition } from '~/type/minigame'
import { i18n } from '~/modules/i18n'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useMiniGameStore } from '~/stores/miniGame'
import { profMerdant } from '../characters/prof-merdant'
import { psyEgg } from '../items/items'

export const shlagPairsMiniGame: MiniGameDefinition = {
  id: 'shlagpairs',
  label: 'Shlag Pairs',
  character: profMerdant,
  component: () => import('~/components/minigame/MiniGameShlagPairs.vue'),
  reward: { type: 'item', itemId: psyEgg.id },
  createIntro(start) {
    const miniGame = useMiniGameStore()
    const panel = useMainPanelStore()
    return [
      {
        id: 'start',
        text: 'Une partie du jeu des paires ?',
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
        text: i18n.global.t('data.Minigame.ShlagPairs.winText'),
        responses: [
          { label: i18n.global.t('data.Minigame.ShlagPairs.super'), type: 'valid', action: done },
        ],
      },
    ]
  },
  createFailure(done) {
    const miniGame = useMiniGameStore()
    return [
      {
        id: 'fail',
        text: 'Dommage !',
        responses: [
          { label: 'Recommencer', type: 'primary', action: () => miniGame.play() },
          { label: 'Retour', type: 'danger', action: done },
        ],
      },
    ]
  },
}
