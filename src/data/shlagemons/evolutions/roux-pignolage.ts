import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const rouxPignolage: BaseShlagemon = {
  id: 'roux-pignolage',
  name: 'Roux Pignolage',
  description: `Roux Pignolage est l’évolution finale et tragique de Roux pas Cool. Il a troqué sa guitare pour un clavier graisseux, et sa passion pour l’indé est devenue une fixette sur les archives "non censurées" des forums Shlagépédia. Il vit recroquevillé dans une carapace de mauvaise foi, de miettes de chips, et de regrets sociaux profonds.

Ses plumes sont ternes, collées par des fluides suspects et du gel pour cheveux périmé. Il parle peu, mais quand il le fait, c’est pour balancer des monologues confus sur la liberté d’expression, les caméras planquées, et "ce que les gens veulent pas entendre". Il se pignole. Beaucoup. Trop. Il appelle ça du "recentrage énergétique". Les autres appellent ça un délit.

Sa capacité signature, *Stimulation Solitaire*, le soigne légèrement à chaque tour... mais inflige un malus de moral à toute l’équipe alliée. Il utilise aussi *Main Moite*, une attaque de type contact qui a 30% de chance de faire fuir directement l’ennemi par gêne viscérale.

On le croise rarement en public, sauf dans des commentaires de vidéos floues ou à 3h du matin dans des zones Wi-Fi libres. Il prétend être incompris, mais en vérité, tout le monde le comprend très bien… et c’est ça le problème.`,
  descriptionKey: 'data.shlagemons.evolutions.roux-pignolage.description',
  types: [shlagemonTypes.normal, shlagemonTypes.vol],
  coefficient: 40,
}

export default rouxPignolage
