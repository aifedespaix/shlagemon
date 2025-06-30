import type { BaseShlagemon, Stats } from '../types'
import { flanquant, plastoc, vapotonie } from './shlagemons-type'

const baseStats: Stats = {
  hp: 50,
  attack: 10,
  defense: 10,
  smelling: 1,
}

export const carapouffe: BaseShlagemon = {
  id: 'carapouffe',
  name: 'Carapouffe',
  color: '#333388',
  description: `Carapouffe est une Shlagémone de type Slope. Semi-enfoncée dans sa propre carapace moelleuse, elle ne se déplace qu’en roulant lentement, laissant derrière elle une traînée de paillettes et de gloss fondu. Son maquillage dégouline en permanence, formant une couche protectrice impénétrable — les scientifiques appellent ça le « fard d’armure ». Dotée d’un regard mi-séduisant, mi-comateux, elle hypnotise ses adversaires en leur lançant des œillades flasques, accompagnées d’un soupir de lassitude cosmique. Elle passe ses journées à se recoiffer sans bouger la tête, grâce à un système complexe de brosses dissimulées dans son chignon. Sa voix est rauque, son parfum est toxique, et sa principale attaque, "Écrasement Moussant", consiste à s’écrouler violemment sur son ennemi en faisant claquer ses faux ongles.`,
  type: plastoc,
  evolution: [],
  ...baseStats,
}

export const salamiches: BaseShlagemon = {
  id: 'salamiches',
  name: 'Salamiches',
  color: '#ff5533',
  description: `Salamiches est un Shlagémon de type Pain... mais pas le feu noble, non, plutôt le feu de briquet BIC vide qu’on rallume à la 27ᵉ tentative. Toujours torse nu, même en hiver, il arbore une crête en feu mal fixée et des lunettes de soleil qui fondent partiellement à chaque attaque. Il se nourrit exclusivement de chips au paprika, de whisky bon marché, et d’approbation sociale. On le trouve souvent en train de se filmer en selfie pendant qu’il crache des étincelles sur des poubelles. Sa capacité spéciale, *Feu d’ego*, augmente sa puissance chaque fois qu’il se fait huer. Il envoie des punchlines nulles entre deux jets de flamme molle, et rêve de devenir influenceur muscu alors qu’il n’a que deux abdos (et encore, en ombrage). C’est un être loyal, sauf si on lui propose un kebab gratuit ou une promotion chez Feu Vert.`,
  type: flanquant,
  ...baseStats,
}

export const bulgrosboule: BaseShlagemon = {
  id: 'bulgrosboule',
  name: 'Bulgrosboule',
  color: '#88ccff',
  description: `Bulgrosboule est un Shlagémon de type Slope, connu pour ses fesses titanesques capables d’éclipser le soleil couchant. Il avance à reculons, plus par fierté que par stratégie, laissant échapper des bulles parfumées d’une zone que les dresseurs préfèrent ne pas mentionner. Son cri ressemble à un bain moussant sous pression, et sa capacité signature, *Éruption Fessale*, propulse ses ennemis dans une brume tiède et collante. Doté d’une peau rebondie comme une piscine gonflable de brocante, il adore rebondir sur place en gloussant, ce qui désoriente la plupart des adversaires. Bulgrosboule est très affectueux, surtout avec ceux qui le massent. Attention toutefois : s’il se met à trembler des miches, c’est trop tard. Il va buller.`,
  type: vapotonie,
  ...baseStats,
}

export const starters: BaseShlagemon[] = [carapouffe, salamiches, bulgrosboule]
