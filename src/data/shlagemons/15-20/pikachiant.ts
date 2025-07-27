import type { BaseShlagemon } from '~/type'
import { thunderStone } from '~/data/items'
import { shlagemonTypes } from '../../shlagemons-type'
import raichiotte from '../evolutions/raichiotte'

export const pikachiant: BaseShlagemon = {
  id: 'pikachiant',
  name: 'Pikachiant',
  description: `Pikachiant est capable de te saouler avant même de lancer une attaque. Sa queue ressemble à une antenne de TNT tordue, et il émet des bips stridents dès qu’il est contrarié. Il se décharge en permanence (surtout en présence d’appareils électroniques de valeur), et son attaque signature, *Charge Sociale*, provoque une gêne électrique dans tout un rayon de 3 mètres.
Il vit généralement dans des squats connectés où il recharge ses batteries avec des câbles USB volés dans les trains. Il pense que TikTok est une source d’énergie et parle en onomatopées gênantes. À ne pas confondre avec Pikachu, même si lui aussi finit souvent dans une Poképrison pour tapage nocturne.`,
  descriptionKey: 'data.shlagemons.15-20.pikachiant.description',
  types: [shlagemonTypes.electrique],
  coefficient: 17,
  evolution: {
    base: raichiotte,
    condition: {
      type: 'item',
      value: thunderStone,
    },
  },
}

export default pikachiant
