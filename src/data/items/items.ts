import type { Item } from '~/type/item'
import { hyperShlageball, shlageball, superShlageball } from './shlageball'

export const potion: Item = {
  id: 'potion',
  name: 'Potion Dégueulasse',
  description: 'Soigne 50 HP de votre Shlagémon.',
  details: 'Redonne 50 points de vie à votre Shlagémon actif pendant le combat.',
  price: 5,
}

export const defensePotion: Item = {
  id: 'defense-potion',
  name: 'Potion de Défense',
  description: 'Augmente temporairement la défense.',
  details: 'Renforce brièvement la défense de votre Shlagémon actif.',
  price: 7,
}

export const superPotion: Item = {
  id: 'super-potion',
  name: 'Super Potion',
  description: 'Soigne 100 HP de votre Shlagémon.',
  details: 'Redonne 100 points de vie à votre Shlagémon actif pendant le combat.',
  price: 15,
}

export const hyperPotion: Item = {
  id: 'hyper-potion',
  name: 'Hyper Potion',
  description: 'Soigne 200 HP de votre Shlagémon.',
  details: 'Redonne 200 points de vie à votre Shlagémon actif pendant le combat.',
  price: 30,
}

export const allItems: Item[] = [
  shlageball,
  superShlageball,
  hyperShlageball,
  potion,
  defensePotion,
  superPotion,
  hyperPotion,
]
