import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const vieuxBlaireau: BaseShlagemon = {
  id: 'vieux-blaireau',
  name: 'Vieux Blaireau',
  description: `Vieux Blaireau est ce genre de Shlagémon qui traîne dans les mêmes coins depuis trente ans, sans que personne ne se souvienne vraiment quand il est arrivé. Son pelage est terne, ses articulations craquent quand il se baisse, et il parle souvent "d’avant", même quand personne n’a demandé.

Il n’a pas vraiment de technique, mais beaucoup d'expérience : son attaque *Remontrance Fossile* a une chance d’étourdir l’adversaire avec un discours sur "la vraie vie". Il peut aussi utiliser *Jet de Pansement*, une capacité de soin modeste qu’il garde pour lui, évidemment.

On dit qu’il a autrefois gagné un tournoi interzonier, mais la légende reste floue. Aujourd’hui, il râle, il grogne, et parfois, il dort en plein combat. Mais attention : sous la couche de rhumatismes, il reste dangereux… surtout pour les nerfs.`,
  types: [shlagemonTypes.sol],
  coefficient: 22,
}

export default vieuxBlaireau
