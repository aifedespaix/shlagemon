import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const pikachiant: BaseShlagemon = {
  id: 'pikachiant',
  name: 'Pikachiant',
  description: `Pikachiant est capable de te saouler avant même de lancer une attaque. Sa queue ressemble à une antenne de TNT tordue, et il émet des bips stridents dès qu’il est contrarié. Il se décharge en permanence (surtout en présence d’appareils électroniques de valeur), et son attaque signature, *Charge Sociale*, provoque une gêne électrique dans tout un rayon de 3 mètres.
Il vit généralement dans des squats connectés où il recharge ses batteries avec des câbles USB volés dans les trains. Il pense que TikTok est une source d’énergie et parle en onomatopées gênantes. À ne pas confondre avec Pikachu, même si lui aussi finit souvent dans une Poképrison pour tapage nocturne.`,
  types: [shlagemonTypes.electrique],
  coefficient: 2,
}

export default pikachiant
