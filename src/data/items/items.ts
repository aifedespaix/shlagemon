import type { Item } from '~/type/item'
import { hyperShlageball, shlageball, superShlageball } from './shlageball'

// @unocss-include
export const potion: Item = {
  id: 'potion',
  name: 'Potion Dégueulasse',
  description: 'Soigne 50 HP de votre Shlagémon.',
  details: 'Redonne 50 points de vie à votre Shlagémon actif pendant le combat.',
  price: 5,
  currency: 'shlagidolar',
  icon: 'i-game-icons:health-potion',
  iconClass: 'text-red-600 dark:text-red-400',
}

export const defensePotion: Item = {
  id: 'defense-potion',
  name: 'Potion de Défense',
  description: 'Augmente temporairement la défense.',
  details: 'Renforce brièvement la défense de votre Shlagémon actif.',
  price: 7,
  currency: 'shlagidolar',
  icon: 'i-game-icons:magic-potion',
  iconClass: 'text-blue-500 dark:text-blue-400',
}

export const superDefensePotion: Item = {
  id: 'super-defense-potion',
  name: 'Super Potion de Défense',
  description: 'Augmente beaucoup la défense.',
  details: 'Renforce considérablement la défense de votre Shlagémon actif.',
  price: 15,
  currency: 'shlagidolar',
  icon: 'i-game-icons:round-potion',
  iconClass: 'text-blue-600 dark:text-blue-500',
}

export const hyperDefensePotion: Item = {
  id: 'hyper-defense-potion',
  name: 'Hyper Potion de Défense',
  description: 'Maximise temporairement la défense.',
  details: 'Booste énormément la défense de votre Shlagémon actif.',
  price: 25,
  currency: 'shlagidolar',
  icon: 'i-game-icons:standing-potion',
  iconClass: 'text-blue-700 dark:text-blue-600',
}

export const attackPotion: Item = {
  id: 'attack-potion',
  name: 'Potion d\'Attaque',
  description: 'Augmente temporairement l\'attaque.',
  details: 'Renforce brièvement l\'attaque de votre Shlagémon actif.',
  price: 7,
  currency: 'shlagidolar',
  icon: 'i-game-icons:magic-potion',
  iconClass: 'text-orange-500 dark:text-orange-400',
}

export const superAttackPotion: Item = {
  id: 'super-attack-potion',
  name: 'Super Potion d\'Attaque',
  description: 'Augmente beaucoup l\'attaque.',
  details: 'Renforce considérablement l\'attaque de votre Shlagémon actif.',
  price: 15,
  currency: 'shlagidolar',
  icon: 'i-game-icons:round-potion',
  iconClass: 'text-orange-600 dark:text-orange-500',
}

export const hyperAttackPotion: Item = {
  id: 'hyper-attack-potion',
  name: 'Hyper Potion d\'Attaque',
  description: 'Maximise temporairement l\'attaque.',
  details: 'Booste énormément l\'attaque de votre Shlagémon actif.',
  price: 25,
  currency: 'shlagidolar',
  icon: 'i-game-icons:standing-potion',
  iconClass: 'text-orange-700 dark:text-orange-600',
}

export const superPotion: Item = {
  id: 'super-potion',
  name: 'Super Potion',
  description: 'Soigne 100 HP de votre Shlagémon.',
  details: 'Redonne 100 points de vie à votre Shlagémon actif pendant le combat.',
  price: 15,
  currency: 'shlagidolar',
  icon: 'i-game-icons:health-potion',
  iconClass: 'text-violet-600 dark:text-violet-400',
}

export const hyperPotion: Item = {
  id: 'hyper-potion',
  name: 'Hyper Potion',
  description: 'Soigne 200 HP de votre Shlagémon.',
  details: 'Redonne 200 points de vie à votre Shlagémon actif pendant le combat.',
  price: 30,
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
  icon: 'carbon:chart-multitype',
  iconClass: 'text-orange-500 dark:text-orange-300',
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

export const pistache: Item = {
  id: 'pistache',
  name: 'Pistache',
  description: 'Permet certaines évolutions de Shlagémon bien pourris.',
  details: 'On sait pas trop ce que ça fait lol.',
  price: 50,
  currency: 'shlagidiamond',
  type: 'evolution',
  image: '/items/pierre-foutre/pierre-foutre.svg',
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
  superPotion,
  hyperPotion,
  multiExp,
  thunderStone,
]
