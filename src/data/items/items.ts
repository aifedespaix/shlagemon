import type { Item } from '~/type/item'
import { hyperShlageball, shlageball, superShlageball } from './shlageball'

export const potion: Item = {
  id: 'potion',
  name: 'Potion Dégueulasse',
  description: 'Soigne 50 HP de votre Shlagémon.',
  details: 'Redonne 50 points de vie à votre Shlagémon actif pendant le combat.',
  price: 5,
  currency: 'shlagidolar',
}

export const defensePotion: Item = {
  id: 'defense-potion',
  name: 'Potion de Défense',
  description: 'Augmente temporairement la défense.',
  details: 'Renforce brièvement la défense de votre Shlagémon actif.',
  price: 7,
  currency: 'shlagidolar',
}

export const superPotion: Item = {
  id: 'super-potion',
  name: 'Super Potion',
  description: 'Soigne 100 HP de votre Shlagémon.',
  details: 'Redonne 100 points de vie à votre Shlagémon actif pendant le combat.',
  price: 15,
  currency: 'shlagidolar',
}

export const hyperPotion: Item = {
  id: 'hyper-potion',
  name: 'Hyper Potion',
  description: 'Soigne 200 HP de votre Shlagémon.',
  details: 'Redonne 200 points de vie à votre Shlagémon actif pendant le combat.',
  price: 30,
  currency: 'shlagidolar',
}

export const thunderStone: Item = {
  id: 'pierre-foudre',
  name: 'Pierre Foudre',
  description: 'Permet certaines évolutions de type électrique.',
  details: 'Fait évoluer Pikachiant en Raïchiotte.',
  price: 10,
  currency: 'shlagidiamond',
  type: 'evolution',
  image: '/items/pierre-foudre/pierre-foudre.svg',
}

export const allItems: Item[] = [
  shlageball,
  superShlageball,
  hyperShlageball,
  potion,
  defensePotion,
  superPotion,
  hyperPotion,
  thunderStone,
]
