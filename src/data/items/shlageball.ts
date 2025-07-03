import type { Ball } from '~/type'

export const balls: Ball[] = [
  {
    id: 'shlageball',
    name: 'Shlagéball',
    description: 'Permet de capturer des Shlagémons sauvages.',
    details: 'Permet de capturer le Shlagémon actuellement en combat. Moins il a de points de vie, plus la chance de capture augmente.',
    price: 10,
    image: '/items/shlageball/shlageball.png',
    catchBonus: 1,
    animation: '/items/shlageball/shlageball.png',
  },
]
