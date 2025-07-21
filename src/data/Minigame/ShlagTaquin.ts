import type { MiniGameDefinition } from '~/type/minigame'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useMiniGameStore } from '~/stores/miniGame'
import { sachatte } from '../characters/sachatte'
import { thunderEgg } from '../items/items'

export const shlagTaquinMiniGame: MiniGameDefinition = {
  id: 'taquin',
  label: 'Taquin',
  character: sachatte,
  component: () => import('~/components/minigame/MiniGameShlagTaquin.vue'),
  reward: { type: 'item', itemId: thunderEgg.id },
  createIntro(start) {
    const miniGame = useMiniGameStore()
    const panel = useMainPanelStore()
    return [
      {
        id: 'start',
        text: 'Une partie de taquin ?',
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
        text: 'Bravo ! Tu gagnes un œuf Foudre.',
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
