import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const electhordu: BaseShlagemon = {
  id: 'electhordu',
  name: 'Électhordu',
  description: `Électhordu est un Shlagémon légendaire né d’un transformateur éclaté pendant une rave sauvage sous la pluie. Frappé par la foudre 347 fois (volontairement), il en est ressorti secoué comme jamais, avec le bec de travers, les plumes hérissées à vie, et un regard qui ne fixe jamais dans la même direction.

Son cri, proche d’un vieux néon qui grésille, perturbe les ondes radio à des kilomètres à la ronde. Il vole en zigzag, souvent à l’envers, et s’électrocute lui-même pour rester éveillé. Son plumage est composé de câbles dénudés et de bouts d’antennes de télé volées. Certains disent qu’il porte toujours une multiprise autour du cou “pour recharger sa haine”.

Électhordu n’a aucun sens de l’orientation, ni des limites sociales. Il débarque sans prévenir dans les zones industrielles désaffectées, où il frotte son plumage contre les pylônes pour “faire des étincelles d’amour”. Chaque battement d’aile provoque des surtensions, des pannes d’ascenseur, et des réveils en panique.

Selon les shlagémonologues, Électhordu était jadis le gardien du “Courant Originel”, une énergie sacrée qui devait équilibrer le monde… mais il a confondu le disjoncteur sacré avec une friteuse et a tout cramé.

Aujourd’hui, il erre, tordu du bec au voltage, parlant seul dans les fils électriques, et semant le chaos statique dans son sillage. Il est à la fois craint, moqué, et branché sur du 12 000 volts en permanence.`,
  descriptionKey: 'data.shlagemons.electhordu.description',

  types: [shlagemonTypes.electrique, shlagemonTypes.vol],
  speciality: 'legendary',
}

export default electhordu
