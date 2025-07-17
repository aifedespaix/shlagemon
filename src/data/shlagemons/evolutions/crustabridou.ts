import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const crustabridou: BaseShlagemon = {
  id: 'crustabridou',
  name: 'Crustabridou',
  description: `Crustabridou, évolution de Cookieyas, ressemble à un Crustabri qui aurait passé trop de temps à traîner dans le fond du frigo familial. Sa carapace, autrefois fière et solide, est désormais couverte de traces de gras, de miettes et de filaments de saucisson sec oubliés. Le pourtour de sa coquille arbore une mystérieuse ficelle rouge et blanche, vestige d’un vieux sauciflard jamais terminé.

Son intérieur n’est plus qu’un mélange douteux entre fromage qui coule, rondelles de saucisson et restes de biscuits moisis. Son regard est encore plus halluciné qu’avant, avec des cernes en forme de tranches de saucisson et une bouche pleine de miettes et de grains de poivre.

Attitude : Crustabridou est persuadé qu’il est la star de tous les apéros, alors qu’en vrai, tout le monde l’évite à cause de son odeur de cave. Son attaque signature, *Jet de Graillon*, consiste à expulser une bouillie huileuse et collante qui fait fuir même les Pokémon les plus courageux.

Anecdote : On raconte que Crustabridou rêve secrètement de devenir ambassadeur du saucisson, mais il confond toujours les plateaux de fromages avec les arènes Pokémon.`,
  types: [shlagemonTypes.eau],
  coefficient: 64,
}

export default crustabridou
