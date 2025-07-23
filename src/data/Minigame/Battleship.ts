import type { MiniGameDefinition } from '~/type/minigame'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useMiniGameStore } from '~/stores/miniGame'
import { vladimirPutain } from '../characters/vladimir-putain'
import { waterEgg } from '../items/items'

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
        text: 'Une partie de bataille navale ?',
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
        text: 'Victoire ! Tu gagnes un \u0153uf Eau.',
        responses: [
          { label: 'Super !', type: 'valid', action: done },
        ],
      },
    ]
  },
  createFailure(done) {
    const miniGame = useMiniGameStore()
    return [
      {
        id: 'fail',
        text: 'Perdu ! Recommence quand tu veux.',
        responses: [
          { label: 'Recommencer', type: 'primary', action: () => miniGame.play() },
          { label: 'Retour', type: 'danger', action: done },
        ],
      },
    ]
  },
}
