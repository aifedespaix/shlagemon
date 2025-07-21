import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const nanmeouesh: BaseShlagemon = {
  id: 'nanmeouesh',
  name: 'Nanméouesh',
  description: `Nanmeouesh passe ses journées à zoner devant la pharmacie en donnant des diagnostics à voix haute, sans qu’on lui demande. Il prétend avoir un diplôme "d’université de la street" et soigne surtout avec du sirop de tonton. Il communique uniquement en "wesh", "t'as capté" et "t’inquiète t’as rien". Malgré son allure nonchalante et ses lunettes trop stylées pour le reste de son corps, il ressent les bobos émotionnels mieux que n’importe quel Psy-type. Son attaque signature, Check-up Relou, oblige tous les ennemis à écouter une consultation de 3 minutes avec bilan complet, ce qui peut causer Sommeil ou Confusion.`,
  descriptionKey: 'data.shlagemons.15-20.nameouesh.description',
  types: [shlagemonTypes.normal],
  coefficient: 16,
}

export default nanmeouesh
