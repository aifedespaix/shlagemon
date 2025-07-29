import type { Ball } from '~/type'

export const shlageball: Ball = {
  id: 'shlageball',
  name: 'data.items.shlageball.shlageball.name',
  description: 'data.items.shlageball.shlageball.description',
  details: 'data.items.shlageball.shlageball.details',
  price: 10,
  currency: 'shlagidolar',
  category: 'activable',
  image: '/items/shlageball/shlageball.webp',
  catchBonus: 1,
  animation: '/items/shlageball/shlageball.webp',
}

export const superShlageball: Ball = {
  id: 'super-shlageball',
  name: 'data.items.shlageball.superShlageball.name',
  description: 'data.items.shlageball.superShlageball.description',
  details: 'data.items.shlageball.superShlageball.details',
  price: 1000,
  currency: 'shlagidolar',
  category: 'activable',
  image: '/items/shlageball/shlageball.webp',
  catchBonus: 2,
  animation: '/items/shlageball/shlageball.webp',
}

export const hyperShlageball: Ball = {
  id: 'hyper-shlageball',
  name: 'data.items.shlageball.hyperShlageball.name',
  description: 'data.items.shlageball.hyperShlageball.description',
  details: 'data.items.shlageball.hyperShlageball.details',
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
