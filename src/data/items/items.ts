import type { Item } from '~/type/item'
import { hyperShlageball, shlageball, superShlageball } from './shlageball'
import {
  advancedAttackRing,
  attackAmulet,
  attackRing,
} from './wearables/attackRing'
import {
  advancedDefenseRing,
  defenseAmulet,
  defenseRing,
} from './wearables/defenseRing'
import {
  advancedVitalityRing,
  vitalityAmulet,
  vitalityRing,
} from './wearables/vitalityRing'
import {
  advancedXpRing,
  xpAmulet,
  xpRing,
} from './wearables/xpRing'

// @unocss-include
export const defensePotion: Item = {
  id: 'defense-potion',
  name: 'Potion de Défense',
  description: 'Augmente temporairement la défense.',
  details: 'Renforce brièvement la défense de votre Shlagémon actif.',
  type: 'defense',
  power: 10,
  price: 50,
  currency: 'shlagidolar',
  category: 'passif',
  icon: 'i-game-icons:magic-potion',
  iconClass: 'text-blue-500 dark:text-blue-400',
}

export const superDefensePotion: Item = {
  id: 'super-defense-potion',
  name: 'Super Potion de Défense',
  description: 'Augmente beaucoup la défense.',
  details: 'Renforce considérablement la défense de votre Shlagémon actif.',
  type: 'defense',
  power: 25,
  price: 500,
  currency: 'shlagidolar',
  category: 'passif',
  icon: 'i-game-icons:round-potion',
  iconClass: 'text-blue-600 dark:text-blue-500',
}

export const hyperDefensePotion: Item = {
  id: 'hyper-defense-potion',
  name: 'Hyper Potion de Défense',
  description: 'Maximise temporairement la défense.',
  details: 'Booste énormément la défense de votre Shlagémon actif.',
  type: 'defense',
  power: 50,
  price: 5000,
  currency: 'shlagidolar',
  category: 'passif',
  icon: 'i-game-icons:standing-potion',
  iconClass: 'text-blue-700 dark:text-blue-600',
}

export const attackPotion: Item = {
  id: 'attack-potion',
  name: 'Potion d\'Attaque',
  description: 'Augmente temporairement l\'attaque.',
  details: 'Renforce brièvement l\'attaque de votre Shlagémon actif.',
  type: 'attack',
  power: 10,
  price: 60,
  currency: 'shlagidolar',
  category: 'passif',
  icon: 'i-game-icons:magic-potion',
  iconClass: 'text-orange-500 dark:text-orange-400',
}

export const superAttackPotion: Item = {
  id: 'super-attack-potion',
  name: 'Super Potion d\'Attaque',
  description: 'Augmente beaucoup l\'attaque.',
  details: 'Renforce considérablement l\'attaque de votre Shlagémon actif.',
  type: 'attack',
  power: 25,
  price: 600,
  currency: 'shlagidolar',
  category: 'passif',
  icon: 'i-game-icons:round-potion',
  iconClass: 'text-orange-600 dark:text-orange-500',
}

export const hyperAttackPotion: Item = {
  id: 'hyper-attack-potion',
  name: 'Hyper Potion d\'Attaque',
  description: 'Maximise temporairement l\'attaque.',
  details: 'Booste énormément l\'attaque de votre Shlagémon actif.',
  type: 'attack',
  power: 50,
  price: 6000,
  currency: 'shlagidolar',
  category: 'passif',
  icon: 'i-game-icons:standing-potion',
  iconClass: 'text-orange-700 dark:text-orange-600',
}

export const vitalityPotion: Item = {
  id: 'vitality-potion',
  name: 'Potion de Vitalité',
  description: 'Augmente temporairement les PV.',
  details: 'Augmente les PV de votre Shlagémon actif de 10% pendant quelques minutes.',
  type: 'vitality',
  power: 10,
  price: 70,
  currency: 'shlagidolar',
  category: 'passif',
  icon: 'i-game-icons:magic-potion',
  iconClass: 'text-violet-500 dark:text-violet-400',
}

export const superVitalityPotion: Item = {
  id: 'super-vitality-potion',
  name: 'Super Potion de Vitalité',
  description: 'Augmente beaucoup les PV.',
  details: 'Augmente les PV de votre Shlagémon actif de 25% pendant quelques minutes.',
  type: 'vitality',
  power: 25,
  price: 700,
  currency: 'shlagidolar',
  category: 'passif',
  icon: 'i-game-icons:round-potion',
  iconClass: 'text-violet-600 dark:text-violet-500',
}

export const hyperVitalityPotion: Item = {
  id: 'hyper-vitality-potion',
  name: 'Hyper Potion de Vitalité',
  description: 'Maximise temporairement les PV.',
  details: 'Augmente les PV de votre Shlagémon actif de 50% pendant quelques minutes.',
  type: 'vitality',
  power: 50,
  price: 7000,
  currency: 'shlagidolar',
  category: 'passif',
  icon: 'i-game-icons:standing-potion',
  iconClass: 'text-violet-700 dark:text-violet-600',
}

export const xpPotion: Item = {
  id: 'xp-potion',
  name: 'Potion d\'Expérience',
  description: 'Augmente temporairement les gains d\'XP.',
  details: 'Améliore l\'XP gagnée de 10% pendant quelques minutes.',
  type: 'xp',
  power: 10,
  price: 40,
  currency: 'shlagidolar',
  category: 'passif',
  icon: 'i-game-icons:magic-potion',
  iconClass: 'text-green-600 dark:text-green-400',
}

export const superXpPotion: Item = {
  id: 'super-xp-potion',
  name: 'Super Potion d\'Expérience',
  description: 'Augmente beaucoup les gains d\'XP.',
  details: 'Améliore l\'XP gagnée de 25% pendant quelques minutes.',
  type: 'xp',
  power: 25,
  price: 400,
  currency: 'shlagidolar',
  category: 'passif',
  icon: 'i-game-icons:round-potion',
  iconClass: 'text-green-700 dark:text-green-500',
}

export const hyperXpPotion: Item = {
  id: 'hyper-xp-potion',
  name: 'Hyper Potion d\'Expérience',
  description: 'Maximise temporairement les gains d\'XP.',
  details: 'Améliore l\'XP gagnée de 50% pendant quelques minutes.',
  type: 'xp',
  power: 50,
  price: 4000,
  currency: 'shlagidolar',
  category: 'passif',
  icon: 'i-game-icons:standing-potion',
  iconClass: 'text-green-800 dark:text-green-600',
}

export const capturePotion: Item = {
  id: 'capture-potion',
  name: 'Potion de Capture',
  description: 'Augmente légèrement les chances de capture.',
  details: 'Améliore la probabilité de capture de 10% pendant quelques minutes.',
  type: 'capture',
  power: 10,
  price: 40,
  currency: 'shlagidolar',
  category: 'passif',
  icon: 'i-game-icons:magic-potion',
  iconClass: 'text-teal-600 dark:text-teal-400',
}

export const superCapturePotion: Item = {
  id: 'super-capture-potion',
  name: 'Super Potion de Capture',
  description: 'Augmente beaucoup les chances de capture.',
  details: 'Améliore la probabilité de capture de 25% pendant quelques minutes.',
  type: 'capture',
  power: 25,
  price: 400,
  currency: 'shlagidolar',
  category: 'passif',
  icon: 'i-game-icons:round-potion',
  iconClass: 'text-teal-700 dark:text-teal-500',
}

export const hyperCapturePotion: Item = {
  id: 'hyper-capture-potion',
  name: 'Hyper Potion de Capture',
  description: 'Maximise les chances de capture.',
  details: 'Améliore la probabilité de capture de 50% pendant quelques minutes.',
  type: 'capture',
  power: 50,
  price: 4000,
  currency: 'shlagidolar',
  category: 'passif',
  icon: 'i-game-icons:standing-potion',
  iconClass: 'text-teal-800 dark:text-teal-600',
}

export const potion: Item = {
  id: 'potion',
  name: 'Potion Dégueulasse',
  description: 'Soigne 50 HP de votre Shlagémon.',
  details: 'Redonne 50 points de vie à votre Shlagémon actif pendant le combat.',
  type: 'heal',
  power: 50,
  price: 10,
  currency: 'shlagidolar',
  category: 'actif',
  icon: 'i-game-icons:health-potion',
  iconClass: 'text-red-600 dark:text-red-400',
}

export const superPotion: Item = {
  id: 'super-potion',
  name: 'Super Potion',
  description: 'Soigne 100 HP de votre Shlagémon.',
  details: 'Redonne 100 points de vie à votre Shlagémon actif pendant le combat.',
  type: 'heal',
  power: 100,
  price: 100,
  currency: 'shlagidolar',
  category: 'actif',
  icon: 'i-game-icons:health-potion',
  iconClass: 'text-violet-600 dark:text-violet-400',
}

export const hyperPotion: Item = {
  id: 'hyper-potion',
  name: 'Hyper Potion',
  description: 'Soigne 200 HP de votre Shlagémon.',
  details: 'Redonne 200 points de vie à votre Shlagémon actif pendant le combat.',
  type: 'heal',
  power: 200,
  price: 1000,
  currency: 'shlagidolar',
  category: 'actif',
  icon: 'i-game-icons:health-potion',
  iconClass: 'text-yellow-500 dark:text-yellow-300',
}

export const multiExp: Item = {
  id: 'multi-exp',
  name: 'Multi-EXP',
  description: 'Partage l\'XP avec un Shlagémon.',
  details:
    'Permet de partager 50% de l\'XP gagnée en combat avec le Shlagémon porteur.',
  price: 20,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:three-friends',
  iconClass: 'text-orange-500 dark:text-orange-300',
  unique: true,
  wearable: true,
}

export const thunderStone: Item = {
  id: 'pierre-foutre',
  name: 'Pierre Foutre',
  description: 'Permet certaines évolutions de type électrique.',
  details: 'Fait évoluer Pikachiant en Raïchiotte.',
  price: 10,
  currency: 'shlagidiamond',
  category: 'actif',
  type: 'evolution',
  image: '/items/pierre-foutre/pierre-foutre.svg',
}

export const steroids: Item = {
  id: 'steroides',
  name: 'Stéroïdes',
  description: 'Permet certaines évolutions de type "gros beauf bodybuildé toxique".',
  details: `Fait évoluer Macho en Masschopeur, à condition qu’il ait passé au moins 3h à la salle, sans jambes, évidemment.`,
  price: 50,
  currency: 'shlagidiamond',
  category: 'actif',
  type: 'evolution',
  icon: 'i-iconoir:potion',
  iconClass: 'text-orange-500 dark:text-orange-300',
}

export const ultraSteroid: Item = {
  id: 'ultra-steroide',
  name: 'Ultra-Stéroïde',
  description: `Une substance interdite dans 97 pays, 2 dimensions et au moins une timeline.`,
  details: `Fait évoluer Masschopeur en Macintosh, une forme d’hypertrophie critique atteignant le point de non-retour. À manipuler avec des gants, une perche, et un avocat.`,
  price: 100,
  currency: 'shlagidiamond',
  category: 'actif',
  type: 'evolution',
  icon: 'i-iconoir:potion',
  iconClass: 'text-purple-500 dark:text-purple-300',
}

export const eggBox: Item = {
  id: 'egg-box',
  name: 'Boîte à œufs',
  description: 'Permet de stocker tous tes œufs sans encombrer l\'inventaire.',
  category: 'utilitaire',
  unique: true,
  icon: 'i-game-icons:nest-eggs',
  iconClass: 'text-yellow-600 dark:text-yellow-500',
}

export const fireEgg: Item = {
  id: 'oeuf-feu',
  name: 'Œuf Feu',
  description: 'Un œuf chaud bouillant.',
  price: 30,
  currency: 'shlagidolar',
  category: 'utilitaire',
  icon: 'i-game-icons:egg-eye',
  iconClass: 'text-orange-500 dark:text-orange-400',
}

export const waterEgg: Item = {
  id: 'oeuf-eau',
  name: 'Œuf Eau',
  description: 'Un œuf qui ruisselle.',
  price: 30,
  currency: 'shlagidolar',
  category: 'utilitaire',
  icon: 'i-game-icons:egg-eye',
  iconClass: 'text-blue-500 dark:text-blue-400',
}

export const grassEgg: Item = {
  id: 'oeuf-herbe',
  name: 'Œuf Herbe',
  description: 'Un œuf qui sent la pelouse.',
  price: 30,
  currency: 'shlagidolar',
  category: 'utilitaire',
  icon: 'i-game-icons:egg-eye',
  iconClass: 'text-green-500 dark:text-green-400',
}

export const psyEgg: Item = {
  id: 'oeuf-psy',
  name: 'Œuf Psy',
  description: 'Un œuf qui te fixe intensément.',
  price: 30,
  currency: 'shlagidolar',
  category: 'utilitaire',
  icon: 'i-game-icons:egg-eye',
  iconClass: 'text-pink-500 dark:text-pink-400',
}

export const allItems = [
  shlageball,
  superShlageball,
  hyperShlageball,
  potion,
  defensePotion,
  superDefensePotion,
  hyperDefensePotion,
  attackPotion,
  superAttackPotion,
  hyperAttackPotion,
  vitalityPotion,
  superVitalityPotion,
  hyperVitalityPotion,
  capturePotion,
  superCapturePotion,
  hyperCapturePotion,
  superPotion,
  hyperPotion,
  xpPotion,
  superXpPotion,
  hyperXpPotion,
  multiExp,
  vitalityRing,
  advancedVitalityRing,
  vitalityAmulet,
  xpRing,
  advancedXpRing,
  xpAmulet,
  attackRing,
  advancedAttackRing,
  attackAmulet,
  defenseRing,
  advancedDefenseRing,
  defenseAmulet,
  thunderStone,
  steroids,
  ultraSteroid,
  eggBox,
  fireEgg,
  waterEgg,
  grassEgg,
  psyEgg,
] as const satisfies Item[]

export type ItemId = typeof allItems[number]['id']
