import type { MiniGameDefinition } from '~/type/minigame'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useMiniGameStore } from '~/stores/miniGame'
import { sachatte } from '../characters/sachatte'
import { fireEgg } from '../items/items'

export const shlagPairsMiniGame: MiniGameDefinition = {
  id: 'shlagpairs',
  label: 'Shlag Pairs',
  character: sachatte,
  component: () => import('~/components/minigame/MiniGameShlagPairs.vue'),
  reward: { type: 'item', itemId: fireEgg.id },
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
        text: 'Bien joue !',
        responses: [
          { label: 'Super !', type: 'valid', action: done },
        ],
      },
    ]
  },
  createFailure(done) {
    return [
      {
        id: 'fail',
        text: 'Dommage !',
        responses: [
          { label: 'Retour', type: 'danger', action: done },
        ],
      },
    ]
  },
}
