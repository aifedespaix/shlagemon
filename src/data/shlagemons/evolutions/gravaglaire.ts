import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import grosseflemme from './grosseflemme'

export const gravaglaire: BaseShlagemon = {
  id: 'gravaglaire',
  name: 'Gravaglaire',
  description: `Gravaglaire est la version déglinguée et bien plus massive de Racaillou. On dirait une boule de roche mal roulée, couverte de croûtes, de taches jaunâtres et de restes de stickers arrachés. Son visage est encore plus fatigué, le teint gris-vert maladif, les yeux rouges et mi-clos, cernés à mort.

À force de fumer du shit de mauvaise qualité, il passe ses journées à tousser et à cracher des glaires visqueuses sur ses ennemis. Parfois, une fine fumée s’échappe encore de ses narines ou de sa bouche. Il traîne des paquets de mouchoirs sales et s’essuie le museau d’un revers de bras rocailleux.

**Attaque signature :** *Jet de Glaires* — Gravaglaire expulse une énorme glaire gluante et toxique qui colle à la cible, la ralentit et dégoûte tous les Shlagémons autour.

On dit que plus personne ne veut s’asseoir à côté de lui, même dans les squats abandonnés. Mais, malgré sa crasse et ses glaires, il conserve toujours son éternelle casquette et une banane encore plus trouée.`,
  types: [shlagemonTypes.roche, shlagemonTypes.sol],
  coefficient: 82,
  evolution: {
    base: grosseflemme,
    condition: {
      type: 'lvl',
      value: 89,
    },
  },
}

export default gravaglaire
