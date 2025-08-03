import type { SavageZoneId, Zone } from '~/type'
import { VILLAGE_OFFSET } from '~/constants/zone'
import {
  attackPotion,
  capturePotion,
  defensePotion,
  hyperAttackPotion,
  hyperDefensePotion,
  hyperPotion,
  mysteriousPotion,
  potion,
  specialPotion,
  superAttackPotion,
  superCapturePotion,
  superDefensePotion,
  superPotion,
  superVitalityPotion,
  superXpPotion,
  vitalityPotion,
  xpPotion,
} from '~/data/items'
import { shlageball, superShlageball } from '~/data/items/shlageball'
import { move } from '~/utils/position'
import { savage55 } from '../savages/55-vallee-des-chieurs'

export const village60: Zone = {
  id: 'village-cassos-land',
  name: 'Village des Cassos',
  type: 'village',
  villageType: 'hyper',
  position: move.top(savage55.position, VILLAGE_OFFSET),
  map: {
    center: { lat: -161.77487856491092, lng: 148.44469099948034 },
    min: { lat: -85.45745914222587, lng: 41.59566010649884 },
    max: { lat: -243.90579690735706, lng: 231.3421777614858 },
  },
  attachedTo: savage55.id as SavageZoneId,
  minLevel: 60,
  pois: {
    shop: {
      id: 'shop',
      type: 'shop',
      label: 'Shop du Village',
      position: { lat: -139.28524128945546, lng: 131.4337259890873 },
      items: [
        potion,
        superPotion,
        defensePotion,
        superDefensePotion,
        attackPotion,
        superAttackPotion,
        vitalityPotion,
        superVitalityPotion,
        xpPotion,
        superXpPotion,
        capturePotion,
        superCapturePotion,
        shlageball,
        superShlageball,
        hyperPotion,
        hyperAttackPotion,
        hyperDefensePotion,
        specialPotion,
        mysteriousPotion,
      ],
    },
    arena: {
      id: 'arena',
      type: 'arena',
      label: 'Arène du Village',
      position: { lat: -189.51209405836568, lng: 169.24977339340174 },
    },
    minigame: {
      id: 'minigame',
      type: 'minigame',
      label: 'Mini-jeu',
      position: { lat: -96.4523891083971, lng: 134.07193303489305 },
      miniGame: 'connectfour',
    },
  },
}
