import type { Item } from '~/type/item'
import { hyperShlageball, shlageball, superShlageball } from './shlageball'

// @unocss-include
export const defensePotion: Item = {
  id: 'defense-potion',
  name: 'Potion de Défense',
  description: 'Augmente temporairement la défense.',
  details: 'Renforce brièvement la défense de votre Shlagémon actif.',
  price: 50,
  currency: 'shlagidolar',
  icon: 'i-game-icons:magic-potion',
  iconClass: 'text-blue-500 dark:text-blue-400',
}

export const superDefensePotion: Item = {
  id: 'super-defense-potion',
  name: 'Super Potion de Défense',
  description: 'Augmente beaucoup la défense.',
  details: 'Renforce considérablement la défense de votre Shlagémon actif.',
  price: 500,
  currency: 'shlagidolar',
  icon: 'i-game-icons:round-potion',
  iconClass: 'text-blue-600 dark:text-blue-500',
}

export const hyperDefensePotion: Item = {
  id: 'hyper-defense-potion',
  name: 'Hyper Potion de Défense',
  description: 'Maximise temporairement la défense.',
  details: 'Booste énormément la défense de votre Shlagémon actif.',
  price: 5000,
  currency: 'shlagidolar',
  icon: 'i-game-icons:standing-potion',
  iconClass: 'text-blue-700 dark:text-blue-600',
}

export const attackPotion: Item = {
  id: 'attack-potion',
  name: 'Potion d\'Attaque',
  description: 'Augmente temporairement l\'attaque.',
  details: 'Renforce brièvement l\'attaque de votre Shlagémon actif.',
  price: 60,
  currency: 'shlagidolar',
  icon: 'i-game-icons:magic-potion',
  iconClass: 'text-orange-500 dark:text-orange-400',
}

export const superAttackPotion: Item = {
  id: 'super-attack-potion',
  name: 'Super Potion d\'Attaque',
  description: 'Augmente beaucoup l\'attaque.',
  details: 'Renforce considérablement l\'attaque de votre Shlagémon actif.',
  price: 600,
  currency: 'shlagidolar',
  icon: 'i-game-icons:round-potion',
  iconClass: 'text-orange-600 dark:text-orange-500',
}

export const hyperAttackPotion: Item = {
  id: 'hyper-attack-potion',
  name: 'Hyper Potion d\'Attaque',
  description: 'Maximise temporairement l\'attaque.',
  details: 'Booste énormément l\'attaque de votre Shlagémon actif.',
  price: 6000,
  currency: 'shlagidolar',
  icon: 'i-game-icons:standing-potion',
  iconClass: 'text-orange-700 dark:text-orange-600',
}

export const vitalityPotion: Item = {
  id: 'vitality-potion',
  name: 'Potion de Vitalité',
  description: 'Augmente temporairement les PV.',
  details: 'Augmente les PV de votre Shlagémon actif de 10% pendant quelques minutes.',
  price: 70,
  currency: 'shlagidolar',
  icon: 'i-game-icons:magic-potion',
  iconClass: 'text-violet-500 dark:text-violet-400',
}

export const superVitalityPotion: Item = {
  id: 'super-vitality-potion',
  name: 'Super Potion de Vitalité',
  description: 'Augmente beaucoup les PV.',
  details: 'Augmente les PV de votre Shlagémon actif de 25% pendant quelques minutes.',
  price: 700,
  currency: 'shlagidolar',
  icon: 'i-game-icons:round-potion',
  iconClass: 'text-violet-600 dark:text-violet-500',
}

export const hyperVitalityPotion: Item = {
  id: 'hyper-vitality-potion',
  name: 'Hyper Potion de Vitalité',
  description: 'Maximise temporairement les PV.',
  details: 'Augmente les PV de votre Shlagémon actif de 50% pendant quelques minutes.',
  price: 7000,
  currency: 'shlagidolar',
  icon: 'i-game-icons:standing-potion',
  iconClass: 'text-violet-700 dark:text-violet-600',
}

export const xpPotion: Item = {
  id: 'xp-potion',
  name: 'Potion d\'Expérience',
  description: 'Augmente temporairement les gains d\'XP.',
  details: 'Améliore l\'XP gagnée de 10% pendant quelques minutes.',
  price: 40,
  currency: 'shlagidolar',
  icon: 'i-game-icons:magic-potion',
  iconClass: 'text-green-600 dark:text-green-400',
}

export const superXpPotion: Item = {
  id: 'super-xp-potion',
  name: 'Super Potion d\'Expérience',
  description: 'Augmente beaucoup les gains d\'XP.',
  details: 'Améliore l\'XP gagnée de 25% pendant quelques minutes.',
  price: 400,
  currency: 'shlagidolar',
  icon: 'i-game-icons:round-potion',
  iconClass: 'text-green-700 dark:text-green-500',
}

export const hyperXpPotion: Item = {
  id: 'hyper-xp-potion',
  name: 'Hyper Potion d\'Expérience',
  description: 'Maximise temporairement les gains d\'XP.',
  details: 'Améliore l\'XP gagnée de 50% pendant quelques minutes.',
  price: 4000,
  currency: 'shlagidolar',
  icon: 'i-game-icons:standing-potion',
  iconClass: 'text-green-800 dark:text-green-600',
}

export const potion: Item = {
  id: 'potion',
  name: 'Potion Dégueulasse',
  description: 'Soigne 50 HP de votre Shlagémon.',
  details: 'Redonne 50 points de vie à votre Shlagémon actif pendant le combat.',
  price: 10,
  currency: 'shlagidolar',
  icon: 'i-game-icons:health-potion',
  iconClass: 'text-red-600 dark:text-red-400',
}

export const superPotion: Item = {
  id: 'super-potion',
  name: 'Super Potion',
  description: 'Soigne 100 HP de votre Shlagémon.',
  details: 'Redonne 100 points de vie à votre Shlagémon actif pendant le combat.',
  price: 100,
  currency: 'shlagidolar',
  icon: 'i-game-icons:health-potion',
  iconClass: 'text-violet-600 dark:text-violet-400',
}

export const hyperPotion: Item = {
  id: 'hyper-potion',
  name: 'Hyper Potion',
  description: 'Soigne 200 HP de votre Shlagémon.',
  details: 'Redonne 200 points de vie à votre Shlagémon actif pendant le combat.',
  price: 1000,
  currency: 'shlagidolar',
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
  icon: 'i-game-icons:three-friends',
  iconClass: 'text-orange-500 dark:text-orange-300',
  unique: true,
  wearable: true,
}

export const vitalityRing: Item = {
  id: 'vitality-ring',
  name: 'Bague Vitalesque',
  description: 'Augmente les PV max du porteur.',
  details:
    'Portée par un Shlagémon, elle augmente ses PV maximum de 15%. Effet cumulable avec les potions de vitalité.',
  price: 20,
  currency: 'shlagidiamond',
  icon: 'i-game-icons:ring',
  iconClass: 'text-red-500 dark:text-red-400',
  unique: true,
  wearable: true,
}

export const xpRing: Item = {
  id: 'xp-ring',
  name: 'Anneau d\'expérience',
  description: 'Augmente l\'XP du porteur.',
  details:
    'Porté par un Shlagémon, il augmente l\'expérience gagnée en combat de 15%. Effet cumulable avec les potions d\'expérience.',
  price: 20,
  currency: 'shlagidiamond',
  icon: 'i-game-icons:big-diamond-ring',
  iconClass: 'text-green-600 dark:text-green-400',
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
  type: 'evolution',
  icon: 'i-iconoir:potion',
  iconClass: 'text-purple-500 dark:text-purple-300',
}

export const allItems: Item[] = [
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
  superPotion,
  hyperPotion,
  xpPotion,
  superXpPotion,
  hyperXpPotion,
  multiExp,
  vitalityRing,
  xpRing,
  thunderStone,
  steroids,
  ultraSteroid,
]
