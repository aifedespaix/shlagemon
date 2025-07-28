import type { Ball } from '~/type'

export const shlageball: Ball = {
  id: 'shlageball',
  nameKey: 'data.items.shlageball.shlageball.name',
  name: 'Shlagéball',
  descriptionKey: 'data.items.shlageball.shlageball.description',
  description: 'Permet de capturer des Shlagémons sauvages.',
  detailsKey: 'data.items.shlageball.shlageball.details',
  details:
    'Permet de capturer le Shlagémon actuellement en combat. Moins il a de points de vie, plus la chance de capture augmente.',
  price: 10,
  currency: 'shlagidolar',
  category: 'activable',
  image: '/items/shlageball/shlageball.webp',
  catchBonus: 1,
  animation: '/items/shlageball/shlageball.webp',
}

export const superShlageball: Ball = {
  id: 'super-shlageball',
  nameKey: 'data.items.shlageball.superShlageball.name',
  name: 'Super Shlagéball',
  descriptionKey: 'data.items.shlageball.superShlageball.description',
  description: 'Améliore les chances de capture.',
  detailsKey: 'data.items.shlageball.superShlageball.details',
  details:
    'Capture des Shlagémons plus récalcitrants avec un léger bonus de chance.',
  price: 1000,
  currency: 'shlagidolar',
  category: 'activable',
  image: '/items/shlageball/shlageball.webp',
  catchBonus: 2,
  animation: '/items/shlageball/shlageball.webp',
}

export const hyperShlageball: Ball = {
  id: 'hyper-shlageball',
  nameKey: 'data.items.shlageball.hyperShlageball.name',
  name: 'Hyper Shlagéball',
  descriptionKey: 'data.items.shlageball.hyperShlageball.description',
  description: 'Offre de très hautes chances de capture.',
  detailsKey: 'data.items.shlageball.hyperShlageball.details',
  details:
    'Conçue pour capturer les Shlagémons coriaces, elle bénéficie d’un gros bonus.',
  price: 10000,
  currency: 'shlagidolar',
  category: 'activable',
  image: '/items/shlageball/shlageball.webp',
  catchBonus: 3,
  animation: '/items/shlageball/shlageball.webp',
}

export const balls = [
  shlageball,
  superShlageball,
  hyperShlageball,
] as const satisfies Ball[]

export type BallId = typeof balls[number]['id']
