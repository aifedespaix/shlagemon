import type { Ball } from '~/type'

export const shlageball: Ball = {
  id: 'shlageball',
  name: 'Shlagéball',
  description: 'Permet de capturer des Shlagémons sauvages.',
  details:
    'Permet de capturer le Shlagémon actuellement en combat. Moins il a de points de vie, plus la chance de capture augmente.',
  price: 10,
  image: '/items/shlageball/shlageball.png',
  catchBonus: 1,
  animation: '/items/shlageball/shlageball.png',
}

export const superShlageball: Ball = {
  id: 'super-shlageball',
  name: 'Super Shlagéball',
  description: 'Améliore les chances de capture.',
  details:
    'Capture des Shlagémons plus récalcitrants avec un léger bonus de chance.',
  price: 25,
  image: '/items/shlageball/shlageball.png',
  catchBonus: 1.5,
  animation: '/items/shlageball/shlageball.png',
}

export const hyperShlageball: Ball = {
  id: 'hyper-shlageball',
  name: 'Hyper Shlagéball',
  description: 'Offre de très hautes chances de capture.',
  details:
    'Conçue pour capturer les Shlagémons coriaces, elle bénéficie d’un gros bonus.',
  price: 50,
  image: '/items/shlageball/shlageball.png',
  catchBonus: 2,
  animation: '/items/shlageball/shlageball.png',
}

export const balls: Ball[] = [shlageball, superShlageball, hyperShlageball]
