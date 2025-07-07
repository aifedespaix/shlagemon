import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const canarchichon: BaseShlagemon = {
  id: 'canarchicon',
  name: 'Canarchicon',
  description: `Canarchicon est un cousin dégénéré du célèbre canard qu'on ne nommera pas pour des raisons juridiques. Toujours armé de son poireau fatigué (qu’il appelle tendrement “Jean-Chibre”), il chancelle d’un pas bancal, probablement à cause de ses soirées passées à picoler du bouillon cube fermenté. Son œil au beurre noir laisse deviner un mode de vie instable, fait de bastons derrière des bennes à frites et de paris perdus contre des Roucool. Il ne vole pas, il flotte à moitié — sans réelle direction — au gré des vents et des vapeurs d’alcool de cuisson. Sa capacité signature, *Coup de Poireau Tournoyant*, inflige peu de dégâts mais une honte durable. Il peut aussi utiliser *Flatulence de Gras*, une attaque à effet de zone olfactif. Canarchichon n’a jamais gagné un seul combat, mais il persiste... parce qu’il a oublié qu’il pouvait abandonner.`,
  types: [shlagemonTypes.normal, shlagemonTypes.vol],
  coefficient: 5,
}

export default canarchichon
