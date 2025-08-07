import type { Item } from '~/type/item'
import { hyperShlageball, shlageball, superShlageball } from './items/shlageball'
import {
  advancedAttackRing,
  attackAmulet,
  attackRing,
} from './items/wearables/attackRing'
import { croakKing } from './items/wearables/croakKing'
import { cuckRing } from './items/wearables/cuckRing'
import {
  advancedDefenseRing,
  defenseAmulet,
  defenseRing,
} from './items/wearables/defenseRing'
import { preyAmulet } from './items/wearables/preyAmulet'
import {
  advancedVitalityRing,
  vitalityAmulet,
  vitalityRing,
} from './items/wearables/vitalityRing'
import {
  advancedXpRing,
  xpAmulet,
  xpRing,
} from './items/wearables/xpRing'

export { hyperShlageball, shlageball, superShlageball } from './items/shlageball'

// @unocss-include
export const defensePotion: Item = {
  id: 'defense-potion',
  name: 'data.items.defensePotion.name',
  description: 'data.items.defensePotion.description',
  details: 'data.items.defensePotion.details',
  type: 'defense',
  power: 10,
  price: 50,
  currency: 'shlagidolar',
  category: 'passif',
  sfxId: 'items-passive-potion',
  icon: 'i-game-icons:magic-potion',
  iconClass: 'text-blue-500 dark:text-blue-400',
}

export const superDefensePotion: Item = {
  id: 'super-defense-potion',
  name: 'data.items.superDefensePotion.name',
  description: 'data.items.superDefensePotion.description',
  details: 'data.items.superDefensePotion.details',
  type: 'defense',
  power: 25,
  price: 500,
  currency: 'shlagidolar',
  category: 'passif',
  sfxId: 'items-passive-potion',
  icon: 'i-game-icons:round-potion',
  iconClass: 'text-blue-600 dark:text-blue-500',
}

export const hyperDefensePotion: Item = {
  id: 'hyper-defense-potion',
  name: 'data.items.hyperDefensePotion.name',
  description: 'data.items.hyperDefensePotion.description',
  details: 'data.items.hyperDefensePotion.details',
  type: 'defense',
  power: 50,
  price: 55000,
  currency: 'shlagidolar',
  category: 'passif',
  sfxId: 'items-passive-potion',
  icon: 'i-game-icons:standing-potion',
  iconClass: 'text-blue-700 dark:text-blue-600',
}

export const attackPotion: Item = {
  id: 'attack-potion',
  name: 'data.items.attackPotion.name',
  description: 'data.items.attackPotion.description',
  details: 'data.items.attackPotion.details',
  type: 'attack',
  power: 10,
  price: 60,
  currency: 'shlagidolar',
  category: 'passif',
  sfxId: 'items-passive-potion',
  icon: 'i-game-icons:magic-potion',
  iconClass: 'text-orange-500 dark:text-orange-400',
}

export const superAttackPotion: Item = {
  id: 'super-attack-potion',
  name: 'data.items.superAttackPotion.name',
  description: 'data.items.superAttackPotion.description',
  details: 'data.items.superAttackPotion.details',
  type: 'attack',
  power: 25,
  price: 600,
  currency: 'shlagidolar',
  category: 'passif',
  sfxId: 'items-passive-potion',
  icon: 'i-game-icons:round-potion',
  iconClass: 'text-orange-600 dark:text-orange-500',
}

export const hyperAttackPotion: Item = {
  id: 'hyper-attack-potion',
  name: 'data.items.hyperAttackPotion.name',
  description: 'data.items.hyperAttackPotion.description',
  details: 'data.items.hyperAttackPotion.details',
  type: 'attack',
  power: 50,
  price: 65000,
  currency: 'shlagidolar',
  category: 'passif',
  sfxId: 'items-passive-potion',
  icon: 'i-game-icons:standing-potion',
  iconClass: 'text-orange-700 dark:text-orange-600',
}

export const vitalityPotion: Item = {
  id: 'vitality-potion',
  name: 'data.items.vitalityPotion.name',
  description: 'data.items.vitalityPotion.description',
  details: 'data.items.vitalityPotion.details',
  type: 'vitality',
  power: 10,
  price: 70,
  currency: 'shlagidolar',
  category: 'passif',
  sfxId: 'items-passive-potion',
  icon: 'i-game-icons:magic-potion',
  iconClass: 'text-violet-500 dark:text-violet-400',
  detailsParams: { percent: 10 },
}

export const superVitalityPotion: Item = {
  id: 'super-vitality-potion',
  name: 'data.items.superVitalityPotion.name',
  description: 'data.items.superVitalityPotion.description',
  details: 'data.items.superVitalityPotion.details',
  type: 'vitality',
  power: 25,
  price: 700,
  currency: 'shlagidolar',
  category: 'passif',
  sfxId: 'items-passive-potion',
  icon: 'i-game-icons:round-potion',
  iconClass: 'text-violet-600 dark:text-violet-500',
  detailsParams: { percent: 25 },
}

export const hyperVitalityPotion: Item = {
  id: 'hyper-vitality-potion',
  name: 'data.items.hyperVitalityPotion.name',
  description: 'data.items.hyperVitalityPotion.description',
  details: 'data.items.hyperVitalityPotion.details',
  type: 'vitality',
  power: 50,
  price: 75000,
  currency: 'shlagidolar',
  category: 'passif',
  sfxId: 'items-passive-potion',
  icon: 'i-game-icons:standing-potion',
  iconClass: 'text-violet-700 dark:text-violet-600',
  detailsParams: { percent: 50 },
}

export const xpPotion: Item = {
  id: 'xp-potion',
  name: 'data.items.xpPotion.name',
  description: 'data.items.xpPotion.description',
  details: 'data.items.xpPotion.details',
  type: 'xp',
  power: 10,
  price: 40,
  currency: 'shlagidolar',
  category: 'passif',
  sfxId: 'items-passive-potion',
  icon: 'i-game-icons:magic-potion',
  iconClass: 'text-green-600 dark:text-green-400',
  detailsParams: { percent: 10 },
}

export const superXpPotion: Item = {
  id: 'super-xp-potion',
  name: 'data.items.superXpPotion.name',
  description: 'data.items.superXpPotion.description',
  details: 'data.items.superXpPotion.details',
  type: 'xp',
  power: 25,
  price: 400,
  currency: 'shlagidolar',
  category: 'passif',
  sfxId: 'items-passive-potion',
  icon: 'i-game-icons:round-potion',
  iconClass: 'text-green-700 dark:text-green-500',
  detailsParams: { percent: 25 },
}

export const hyperXpPotion: Item = {
  id: 'hyper-xp-potion',
  name: 'data.items.hyperXpPotion.name',
  description: 'data.items.hyperXpPotion.description',
  details: 'data.items.hyperXpPotion.details',
  type: 'xp',
  power: 50,
  price: 45000,
  currency: 'shlagidolar',
  category: 'passif',
  sfxId: 'items-passive-potion',
  icon: 'i-game-icons:standing-potion',
  iconClass: 'text-green-800 dark:text-green-600',
  detailsParams: { percent: 50 },
}

export const odorElixir: Item = {
  id: 'elixir-odeur',
  name: 'data.items.odorElixir.name',
  description: 'data.items.odorElixir.description',
  details: 'data.items.odorElixir.details',
  category: 'actif',
  icon: 'i-game-icons:delicate-perfume',
  iconClass: 'text-yellow-500 dark:text-yellow-300',
}

export const capturePotion: Item = {
  id: 'capture-potion',
  name: 'data.items.capturePotion.name',
  description: 'data.items.capturePotion.description',
  details: 'data.items.capturePotion.details',
  type: 'capture',
  power: 10,
  price: 40,
  currency: 'shlagidolar',
  category: 'passif',
  sfxId: 'items-passive-potion',
  icon: 'i-game-icons:magic-potion',
  iconClass: 'text-teal-600 dark:text-teal-400',
  detailsParams: { percent: 10 },
}

export const superCapturePotion: Item = {
  id: 'super-capture-potion',
  name: 'data.items.superCapturePotion.name',
  description: 'data.items.superCapturePotion.description',
  details: 'data.items.superCapturePotion.details',
  type: 'capture',
  power: 25,
  price: 400,
  currency: 'shlagidolar',
  category: 'passif',
  sfxId: 'items-passive-potion',
  icon: 'i-game-icons:round-potion',
  iconClass: 'text-teal-700 dark:text-teal-500',
  detailsParams: { percent: 25 },
}

export const hyperCapturePotion: Item = {
  id: 'hyper-capture-potion',
  name: 'data.items.hyperCapturePotion.name',
  description: 'data.items.hyperCapturePotion.description',
  details: 'data.items.hyperCapturePotion.details',
  type: 'capture',
  power: 50,
  price: 45000,
  currency: 'shlagidolar',
  category: 'passif',
  sfxId: 'items-passive-potion',
  icon: 'i-game-icons:standing-potion',
  iconClass: 'text-teal-800 dark:text-teal-600',
  detailsParams: { percent: 50 },
}

export const potion: Item = {
  id: 'potion',
  name: 'data.items.potion.name',
  description: 'data.items.potion.description',
  details: 'data.items.potion.details',
  type: 'heal',
  power: 50,
  price: 100,
  currency: 'shlagidolar',
  category: 'battle',
  battleCooldown: 5,
  sfxId: 'items-active-potion',
  icon: 'i-game-icons:health-potion',
  iconClass: 'text-red-600 dark:text-red-400',
  descriptionParams: { hp: 50 },
  detailsParams: { hp: 50 },
}

export const superPotion: Item = {
  id: 'super-potion',
  name: 'data.items.superPotion.name',
  description: 'data.items.superPotion.description',
  details: 'data.items.superPotion.details',
  type: 'heal',
  power: potion.power * 5,
  price: potion.price * 10,
  currency: 'shlagidolar',
  category: 'battle',
  battleCooldown: potion.battleCooldown * 3,
  sfxId: 'items-active-potion',
  icon: 'i-game-icons:health-potion',
  iconClass: 'text-violet-600 dark:text-violet-400',
  descriptionParams: { hp: potion.power * 5 },
  detailsParams: { hp: potion.power * 5 },
}

export const hyperPotion: Item = {
  id: 'hyper-potion',
  name: 'data.items.hyperPotion.name',
  description: 'data.items.hyperPotion.description',
  details: 'data.items.hyperPotion.details',
  type: 'heal',
  power: superPotion.power * 4,
  price: superPotion.price * 10,
  currency: 'shlagidolar',
  category: 'battle',
  battleCooldown: Math.floor(superPotion.battleCooldown * 2.5),
  sfxId: 'items-active-potion',
  icon: 'i-game-icons:health-potion',
  iconClass: 'text-yellow-500 dark:text-yellow-300',
  descriptionParams: { hp: superPotion.power * 4 },
  detailsParams: { hp: superPotion.power * 4 },
}

export const multiExp: Item = {
  id: 'multi-exp',
  name: 'data.items.multiExp.name',
  description: 'data.items.multiExp.description',
  details: 'data.items.multiExp.details',
  price: 20,
  currency: 'shlagidiamond',
  category: 'utilitaire',
  icon: 'i-game-icons:three-friends',
  iconClass: 'text-orange-500 dark:text-orange-300',
  unique: true,
  wearable: true,
  detailsParams: { percent: 50 },
}

export const thunderStone: Item = {
  id: 'pierre-foutre',
  name: 'data.items.thunderStone.name',
  description: 'data.items.thunderStone.description',
  details: 'data.items.thunderStone.details',
  price: 10,
  currency: 'shlagidiamond',
  category: 'actif',
  type: 'evolution',
  icon: 'i-carbon:flash-filled',
  iconClass: 'text-yellow-500 dark:text-yellow-300',
  detailsParams: { from: 'Pikachiant', to: 'Raïchiotte' },
}

export const steroids: Item = {
  id: 'steroides',
  name: 'data.items.steroids.name',
  description: 'data.items.steroids.description',
  details: 'data.items.steroids.details',
  price: 50,
  currency: 'shlagidiamond',
  category: 'actif',
  type: 'evolution',
  icon: 'i-iconoir:potion',
  iconClass: 'text-orange-500 dark:text-orange-300',
  detailsParams: { from: 'Macho', to: 'Masschopeur', hours: 3 },
}

export const ultraSteroid: Item = {
  id: 'ultra-steroide',
  name: 'data.items.ultraSteroid.name',
  description: 'data.items.ultraSteroid.description',
  details: 'data.items.ultraSteroid.details',
  price: 100,
  currency: 'shlagidiamond',
  category: 'actif',
  type: 'evolution',
  icon: 'i-iconoir:potion',
  iconClass: 'text-purple-500 dark:text-purple-300',
  descriptionParams: { countries: 97, dimensions: 2, timelines: 1 },
  detailsParams: { from: 'Masschopeur', to: 'Macintosh' },
}

export const lighter: Item = {
  id: 'briquet',
  name: 'data.items.lighter.name',
  description: 'data.items.lighter.description',
  details: 'data.items.lighter.details',
  price: 25,
  currency: 'shlagidiamond',
  category: 'actif',
  type: 'evolution',
  icon: 'i-game-icons:lighter',
  iconClass: 'text-red-500 dark:text-red-400',
  detailsParams: { from: 'Emboli', to: 'Pyrolise' },
}

export const pissBottle: Item = {
  id: 'bouteille-pisse',
  name: 'data.items.pissBottle.name',
  description: 'data.items.pissBottle.description',
  details: 'data.items.pissBottle.details',
  price: 25,
  currency: 'shlagidiamond',
  category: 'actif',
  type: 'evolution',
  icon: 'i-game-icons:soda-bottle',
  iconClass: 'text-yellow-700 dark:text-yellow-500',
  detailsParams: { from: 'Emboli', to: 'Salmoneli' },
}

export const defibrillator: Item = {
  id: 'defibrilateur',
  name: 'data.items.defibrillator.name',
  description: 'data.items.defibrillator.description',
  details: 'data.items.defibrillator.details',
  price: 25,
  currency: 'shlagidiamond',
  category: 'actif',
  type: 'evolution',
  icon: 'i-game-icons:tesla-coil',
  iconClass: 'text-green-600 dark:text-green-400',
  detailsParams: { from: 'Emboli', to: 'Tuberculi' },
}

export const badgeBox: Item = {
  id: 'badge-box',
  name: 'data.items.badgeBox.name',
  description: 'data.items.badgeBox.description',
  category: 'utilitaire',
  unique: true,
  icon: 'i-carbon:badge',
  iconClass: 'text-amber-600 dark:text-amber-500',
}

export const eggBox: Item = {
  id: 'egg-box',
  name: 'data.items.eggBox.name',
  description: 'data.items.eggBox.description',
  category: 'utilitaire',
  unique: true,
  icon: 'i-game-icons:nest-eggs',
  iconClass: 'text-yellow-600 dark:text-yellow-500',
}

export const fireEgg: Item = {
  id: 'oeuf-feu',
  name: 'data.items.fireEgg.name',
  description: 'data.items.fireEgg.description',
  price: 30,
  currency: 'shlagidolar',
  category: 'utilitaire',
  icon: 'i-game-icons:egg-eye',
  iconClass: 'text-orange-500 dark:text-orange-400',
}

export const waterEgg: Item = {
  id: 'oeuf-eau',
  name: 'data.items.waterEgg.name',
  description: 'data.items.waterEgg.description',
  price: 30,
  currency: 'shlagidolar',
  category: 'utilitaire',
  icon: 'i-game-icons:egg-eye',
  iconClass: 'text-blue-500 dark:text-blue-400',
}

export const grassEgg: Item = {
  id: 'oeuf-herbe',
  name: 'data.items.grassEgg.name',
  description: 'data.items.grassEgg.description',
  price: 30,
  currency: 'shlagidolar',
  category: 'utilitaire',
  icon: 'i-game-icons:egg-eye',
  iconClass: 'text-green-500 dark:text-green-400',
}

export const psyEgg: Item = {
  id: 'oeuf-psy',
  name: 'data.items.psyEgg.name',
  description: 'data.items.psyEgg.description',
  price: 30,
  currency: 'shlagidolar',
  category: 'utilitaire',
  icon: 'i-game-icons:egg-eye',
  iconClass: 'text-pink-500 dark:text-pink-400',
}

export const thunderEgg: Item = {
  id: 'oeuf-foudre',
  name: 'data.items.thunderEgg.name',
  description: 'data.items.thunderEgg.description',
  price: 30,
  currency: 'shlagidolar',
  category: 'utilitaire',
  icon: 'i-game-icons:egg-eye',
  iconClass: 'text-yellow-500 dark:text-yellow-400',
}

export const specialPotion: Item = {
  id: 'special-potion',
  name: 'data.items.specialPotion.name',
  description: 'data.items.specialPotion.description',
  details: 'data.items.specialPotion.details',
  type: 'heal',
  power: 50,
  price: 6666,
  category: 'activable',
  icon: 'i-game-icons:potion-ball',
  iconClass: 'mask-rainbow',
}

export const mysteriousPotion: Item = {
  id: 'mysterious-potion',
  name: 'data.items.mysteriousPotion.name',
  description: 'data.items.mysteriousPotion.description',
  details: 'data.items.mysteriousPotion.details',
  type: 'heal',
  power: 75,
  price: 66666,
  category: 'activable',
  icon: 'i-game-icons:bubbling-flask',
  iconClass: 'mask-rainbow',
}

export const fabulousPotion: Item = {
  id: 'fabulous-potion',
  name: 'data.items.fabulousPotion.name',
  description: 'data.items.fabulousPotion.description',
  details: 'data.items.fabulousPotion.details',
  type: 'heal',
  power: 100,
  price: 666666,
  category: 'activable',
  icon: 'i-game-icons:fizzing-flask',
  iconClass: 'mask-rainbow',

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
  odorElixir,
  multiExp,
  vitalityRing,
  advancedVitalityRing,
  vitalityAmulet,
  xpRing,
  advancedXpRing,
  xpAmulet,
  cuckRing,
  croakKing,
  preyAmulet,
  attackRing,
  advancedAttackRing,
  attackAmulet,
  defenseRing,
  advancedDefenseRing,
  defenseAmulet,
  thunderStone,
  steroids,
  ultraSteroid,
  lighter,
  pissBottle,
  defibrillator,
  badgeBox,
  eggBox,
  fireEgg,
  waterEgg,
  grassEgg,
  psyEgg,
  thunderEgg,
  specialPotion,
  mysteriousPotion,
  fabulousPotion,
] as const satisfies Item[]

export type ItemId = typeof allItems[number]['id']
