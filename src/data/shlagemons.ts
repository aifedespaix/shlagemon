import type { BaseShlagemon } from '~/types'
import { shlagemonTypes } from './shlagemons-type'

export const carapouffe: BaseShlagemon = {
  id: 'carapouffe',
  name: 'Carapouffe',
  color: '#333388',
  description: `Carapouffe est une Shlagémon de type Plastoc. Semi-enfoncée dans sa propre carapace moelleuse, elle ne se déplace qu’en roulant lentement, laissant derrière elle une traînée de paillettes et de gloss fondu. Son maquillage dégouline en permanence, formant une couche protectrice impénétrable — les scientifiques appellent ça le « fard d’armure ». Dotée d’un regard mi-séduisant, mi-comateux, elle hypnotise ses adversaires en leur lançant des œillades flasques, accompagnées d’un soupir de lassitude cosmique. Elle passe ses journées à se recoiffer sans bouger la tête, grâce à un système complexe de brosses dissimulées dans son chignon. Sa voix est rauque, son parfum est toxique, et sa principale attaque, "Écrasement Moussant", consiste à s’écrouler violemment sur son ennemi en faisant claquer ses faux ongles.`,
  type: shlagemonTypes.plastoc,
  evolution: [],
  coefficient: 1,
}

export const salamiches: BaseShlagemon = {
  id: 'salamiches',
  name: 'Salamiches',
  color: '#ff5533',
  description: `Salamiches est un Shlagémon de type Flanquant... il brûle, mais pas de feu noble, non, plutôt de feu de briquet BIC vide qu’on rallume à la 27ᵉ tentative. Toujours torse nu, même en hiver, il arbore une crête en feu mal fixée et des lunettes de soleil qui fondent partiellement à chaque attaque. Il se nourrit exclusivement de chips au paprika, de whisky bon marché, et d’approbation sociale. On le trouve souvent en train de se filmer en selfie pendant qu’il crache des étincelles sur des poubelles. Sa capacité spéciale, *Feu d’ego*, augmente sa puissance chaque fois qu’il se fait huer. Il envoie des punchlines nulles entre deux jets de flamme molle, et rêve de devenir influenceur muscu alors qu’il n’a que deux abdos (et encore, en ombrage). C’est un être loyal, sauf si on lui propose un kebab gratuit ou une promotion chez Feu Vert.`,
  type: shlagemonTypes.flanquant,
  coefficient: 1,
}

export const bulgrosboule: BaseShlagemon = {
  id: 'bulgrosboule',
  name: 'Bulgrosboule',
  color: '#88ccff',
  description: `Bulgrosboule est un Shlagémon de type Vapotonie, connu pour ses fesses titanesques capables d’éclipser le soleil couchant. Il avance à reculons, plus par fierté que par stratégie, laissant échapper des bulles parfumées d’une zone que les dresseurs préfèrent ne pas mentionner. Son cri ressemble à un bain moussant sous pression, et sa capacité signature, *Éruption Fessale*, propulse ses ennemis dans une brume tiède et collante. Doté d’une peau rebondie comme une piscine gonflable de brocante, il adore rebondir sur place en gloussant, ce qui désoriente la plupart des adversaires. Bulgrosboule est très affectueux, surtout avec ceux qui le massent. Attention toutefois : s’il se met à trembler des miches, c’est trop tard. Il va buller.`,
  type: shlagemonTypes.vapotonie,
  coefficient: 1,
}

export const pikachiant: BaseShlagemon = {
  id: 'pikachiant',
  name: 'Pikachiant',
  color: '#f9e743',
  description: `Pikachiant est un Shlagémon de type Electrochiasse, capable de te saouler avant même de lancer une attaque. Sa queue ressemble à une antenne de TNT tordue, et il émet des bips stridents dès qu’il est contrarié. Il se décharge en permanence (surtout en présence d’appareils électroniques de valeur), et son attaque signature, *Charge Sociale*, provoque une gêne électrique dans tout un rayon de 3 mètres.
Il vit généralement dans des squats connectés où il recharge ses batteries avec des câbles USB volés dans les trains. Il pense que TikTok est une source d’énergie et parle en onomatopées gênantes. À ne pas confondre avec Pikachu, même si lui aussi finit souvent dans une Poképrison pour tapage nocturne.`,
  type: shlagemonTypes.electrochiasse,
  coefficient: 2,
}

export const mewteub: BaseShlagemon = {
  id: 'mewteub',
  name: 'Mewteub',
  color: '#f9e743',
  description: `Mewteub est un Shlagémon de type Slope, né d’un bug génétique entre une prise HDMI et une entité cosmique sous anxiolytiques. On murmure qu’il aurait été cloné à partir d’un vieux câble péritel tombé dans une bassine de Monster Energy. Il flotte constamment, mais sans élégance — plutôt comme une chaussette dans un jacuzzi.

Son corps translucide laisse entrevoir un réseau veineux qui clignote au rythme d’un modem 56k. Il émet des sons télépathiques, tous plus gênants les uns que les autres : soupirs, "hmm" douteux et parfois des extraits de discussions MSN de 2003. Il communique principalement par vibration de teub psychique, ce qui perturbe fortement les autres Shlagémons — et les enfants non accompagnés.

Sa capacité spéciale, *Onde Malaise*, fige l’adversaire dans une gêne abyssale pendant plusieurs tours. On dit que croiser son regard provoque des flashbacks de soirées gênantes en boîte de province.

Mewteub est rare. Trop rare. Et franchement, c’est peut-être mieux ainsi.`,
  type: shlagemonTypes.trouNoir,
  coefficient: 10,
}

export const starters: BaseShlagemon[] = [carapouffe, salamiches, bulgrosboule]
export const allShlagemons: BaseShlagemon[] = [
  carapouffe,
  salamiches,
  bulgrosboule,
  pikachiant,
  mewteub,
]
