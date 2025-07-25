import type { Zone } from '~/type'
import { VILLAGE_OFFSET } from '~/constants/zone'
import {
  attackPotion,
  capturePotion,
  defensePotion,
  potion,
  vitalityPotion,
  xpPotion,
} from '~/data/items/items'
import { shlageball } from '~/data/items/shlageball'
import { move } from '~/utils/position'
import { arena20 } from '../../arenas'
import { savage15 } from '../savages/15-ravin-fesse-molle'

export const village20: Zone = {
  id: 'village-boule',
  name: 'Village Sux-Mais-Bouls',
  type: 'village',
  villageType: 'basic',
  position: move.bottom(savage15.position, VILLAGE_OFFSET),
  attachedTo: savage15.id,
  actions: [
    { id: 'minigame', label: 'Mini-jeu' },
  ],
  minLevel: 20,
  arena: {
    get arena() { return arena20 },
    completed: false,
  },
  village: {
    shop: {
      items: [
        potion,
        defensePotion,
        attackPotion,
        vitalityPotion,
        xpPotion,
        capturePotion,
        shlageball,
      ],
    },
  },
  miniGame: 'tictactoe',
}
