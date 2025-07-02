import type { BaseShlagemon } from '~/types'
import { shlagemonTypes } from './shlagemons-type'

export const carapouffe: BaseShlagemon = {
  id: 'carapouffe',
  name: 'Carapouffe',
  color: '#333388',
  description: `Carapouffe est une Shlagémon de type Plastoc. Semi-enfoncée dans sa propre carapace moelleuse, elle ne se déplace qu’en roulant lentement, laissant derrière elle une traînée de paillettes et de gloss fondu. Son maquillage dégouline en permanence, formant une couche protectrice impénétrable — les scientifiques appellent ça le « fard d’armure ». Dotée d’un regard mi-séduisant, mi-comateux, elle hypnotise ses adversaires en leur lançant des œillades flasques, accompagnées d’un soupir de lassitude cosmique. Elle passe ses journées à se recoiffer sans bouger la tête, grâce à un système complexe de brosses dissimulées dans son chignon. Sa voix est rauque, son parfum est toxique, et sa principale attaque, "Écrasement Moussant", consiste à s’écrouler violemment sur son ennemi en faisant claquer ses faux ongles.`,
  types: [shlagemonTypes.eau],
  evolution: [],
  coefficient: 1,
}

export const salamiches: BaseShlagemon = {
  id: 'salamiches',
  name: 'Salamiches',
  color: '#ff5533',
  description: `Salamiches est un Shlagémon de type Flanquant... il brûle, mais pas de feu noble, non, plutôt de feu de briquet BIC vide qu’on rallume à la 27ᵉ tentative. Toujours torse nu, même en hiver, il arbore une crête en feu mal fixée et des lunettes de soleil qui fondent partiellement à chaque attaque. Il se nourrit exclusivement de chips au paprika, de whisky bon marché, et d’approbation sociale. On le trouve souvent en train de se filmer en selfie pendant qu’il crache des étincelles sur des poubelles. Sa capacité spéciale, *Feu d’ego*, augmente sa puissance chaque fois qu’il se fait huer. Il envoie des punchlines nulles entre deux jets de flamme molle, et rêve de devenir influenceur muscu alors qu’il n’a que deux abdos (et encore, en ombrage). C’est un être loyal, sauf si on lui propose un kebab gratuit ou une promotion chez Feu Vert.`,
  types: [shlagemonTypes.feu],
  coefficient: 1,
}

export const bulgrosboule: BaseShlagemon = {
  id: 'bulgrosboule',
  name: 'Bulgrosboule',
  color: '#88ccff',
  description: `Bulgrosboule est un Shlagémon de type Vapotonie, connu pour ses fesses titanesques capables d’éclipser le soleil couchant. Il avance à reculons, plus par fierté que par stratégie, laissant échapper des bulles parfumées d’une zone que les dresseurs préfèrent ne pas mentionner. Son cri ressemble à un bain moussant sous pression, et sa capacité signature, *Éruption Fessale*, propulse ses ennemis dans une brume tiède et collante. Doté d’une peau rebondie comme une piscine gonflable de brocante, il adore rebondir sur place en gloussant, ce qui désoriente la plupart des adversaires. Bulgrosboule est très affectueux, surtout avec ceux qui le massent. Attention toutefois : s’il se met à trembler des miches, c’est trop tard. Il va buller.`,
  types: [shlagemonTypes.plante],
  coefficient: 1,
}

export const pikachiant: BaseShlagemon = {
  id: 'pikachiant',
  name: 'Pikachiant',
  color: '#f9e743',
  description: `Pikachiant est un Shlagémon de type Electrochiasse, capable de te saouler avant même de lancer une attaque. Sa queue ressemble à une antenne de TNT tordue, et il émet des bips stridents dès qu’il est contrarié. Il se décharge en permanence (surtout en présence d’appareils électroniques de valeur), et son attaque signature, *Charge Sociale*, provoque une gêne électrique dans tout un rayon de 3 mètres.
Il vit généralement dans des squats connectés où il recharge ses batteries avec des câbles USB volés dans les trains. Il pense que TikTok est une source d’énergie et parle en onomatopées gênantes. À ne pas confondre avec Pikachu, même si lui aussi finit souvent dans une Poképrison pour tapage nocturne.`,
  types: [shlagemonTypes.electrique],
  coefficient: 2,
}

export const mewteub: BaseShlagemon = {
  id: 'mewteub',
  name: 'Mewteub',
  color: '#f9e743',
  description: `Mewteub est un Shlagémon de type Slope, né d’un bug génétique entre une prise HDMI et une entité cosmique sous anxiolytiques. On murmure qu’il aurait été cloné à partir d’un vieux câble péritel tombé dans une bassine de Monster Energy. Il flotte constamment, mais sans élégance — plutôt comme une chaussette dans un jacuzzi. Son corps translucide laisse entrevoir un réseau veineux qui clignote au rythme d’un modem 56k. Il émet des sons télépathiques, tous plus gênants les uns que les autres : soupirs, "hmm" douteux et parfois des extraits de discussions MSN de 2003. Il communique principalement par vibration de teub psychique, ce qui perturbe fortement les autres Shlagémons — et les enfants non accompagnés. Sa capacité spéciale, *Onde Malaise*, fige l’adversaire dans une gêne abyssale pendant plusieurs tours. On dit que croiser son regard provoque des flashbacks de soirées gênantes en boîte de province.
Mewteub est rare. Trop rare. Et franchement, c’est peut-être mieux ainsi.`,
  types: [shlagemonTypes.psy],
  coefficient: 10,
}

export const sacdepates: BaseShlagemon = {
  id: 'sacdepates',
  name: 'Sac de Pâtes',
  color: '#f9e743',
  description: `Sac de Pâtes est une boule vivante de spaghettis emmêlés, dont les longs brins forment un labyrinthe mouvant. Doté de deux yeux perçants incrustés au milieu de ses pâtes, il intimide quiconque croise son regard infernal. Ses pieds rouges, lisses et luisants, lui permettent de rouler à toute vitesse sur ses adversaires, qu’il écrase sans pitié dans un rire aigu et diabolique. Il passe ses journées à se peigner minutieusement avec un peigne fin, espérant un jour démêler le nœud infini qu’il est devenu. On raconte que plus ses spaghettis sont emmêlés, plus il devient redoutable. Talent : Nœud Fatal — Quand Sacdepâtes subit une attaque physique, il peut s’enrouler autour de l’ennemi pour le piéger et l’immobiliser.`,
  types: [shlagemonTypes.plante],
  coefficient: 2,
}

export const rouxPasCool: BaseShlagemon = {
  id: 'roux-pas-cool',
  name: 'Roux pas Cool',
  color: '#f9e743',
  description: `Roux pas Cool est un Pokémon Balladépressif de type acoustique / malaise. Anciennement cool, Roux pas Cool a passé trop de temps à gratter des accords mineurs au bord d’un volcan éteint. Désormais, Roux pas Cool erre avec une guitare trop grande pour ses ailes, des taches de rousseur qui pleurent, et une chemise à carreaux qui sent l’herbe humide et les regrets. Son plumage a pris une teinte rouille triste, et sa mèche rousse cache un regard empli de remords, comme s’il réalisait constamment qu’il aurait pu évoluer en rapace légendaire, mais a préféré sortir un EP en indépendant. Il fait toujours un peu froid autour de lui, même en plein été. Sa capacité signature, Refrain Gênant, inflige un malaise profond à toute l’arène, réduisant la précision des attaques ennemies tant qu’ils détournent le regard. Il est très doué pour faire fuir les Pokémon sauvages… et les rendez-vous galants.`,
  types: [shlagemonTypes.vol],
  coefficient: 2,
}

export const canarchichon: BaseShlagemon = {
  id: 'canarchicon',
  name: 'Canarchicon',
  color: '#f9e743',
  description: `Canarchicon est un Shlagémon de type Cuisine, cousin dégénéré du célèbre canard qu'on ne nommera pas pour des raisons juridiques. Toujours armé de son poireau fatigué (qu’il appelle tendrement “Jean-Chibre”), il chancelle d’un pas bancal, probablement à cause de ses soirées passées à picoler du bouillon cube fermenté. Son œil au beurre noir laisse deviner un mode de vie instable, fait de bastons derrière des bennes à frites et de paris perdus contre des Roucool. Il ne vole pas, il flotte à moitié — sans réelle direction — au gré des vents et des vapeurs d’alcool de cuisson. Sa capacité signature, *Coup de Poireau Tournoyant*, inflige peu de dégâts mais une honte durable. Il peut aussi utiliser *Flatulence de Gras*, une attaque à effet de zone olfactif. Canarchichon n’a jamais gagné un seul combat, mais il persiste... parce qu’il a oublié qu’il pouvait abandonner.`,
  types: [shlagemonTypes.normal, shlagemonTypes.vol],
  coefficient: 2,
}

export const nosferachid: BaseShlagemon = {
  id: 'nosferachid',
  name: 'Nosferachid',
  color: '#f9e743',
  description: `Nosferachid est un Shlagémon de type Slope, nocturne et fier de l’être. Originaire d’un quartier poussiéreux à l’ombre des HLM de Kanto-Ouest, il vole en rasant les murs avec sa sacoche Louis Viton™ (orthographe non contractuelle), achetée 7 Pokédollars au marché aux puces de Celadop-les-Bains. Il arbore fièrement une casquette visière plate LV assortie, portée en biais pour maximiser l’aérodynamisme et l’attitude. Derrière ses grandes ailes décharnées se cache un petit sachet de "poudre mystique", qu’il dit être pour ses Pokémon... mais personne n’y croit. Nosferachid passe ses nuits à zoner en cercle autour des lampadaires, tout en freestyleant des menaces inaudibles à base de “j’te croque ta daronne” en ultrason. Il attaque rarement de front : il préfère t’endormir avec *Haleine Mentholée Menthe Forte* avant de te vider ton inventaire. On dit qu’il a déjà mordu un Ronflex pour une histoire de briquet. Ronflex dort encore, mais pas pour les bonnes raisons.`,
  types: [shlagemonTypes.poison, shlagemonTypes.vol],
  coefficient: 2,
}

export const dartagnan: BaseShlagemon = {
  id: 'dartagnan',
  name: 'D\'Art Tagnan',
  color: '#f9e743',
  description: `D\'Art Tagnan est un Mousquépique de type panache combatif. Toujours prêt à pérorer avant de piquer, il surgit d’un nuage de poussière dramatique en criant « En garde, manant ! », alors que personne ne l’a regardé. Avec ses dards en forme de rapières et ses antennes sculptées en bouclettes, il enchaîne les moulinets dans le vide juste pour le style. Sa moustache n’existe pas, mais il la twiste régulièrement du bout des griffes, persuadé que ça le rend irrésistible. Son chapeau à plume est greffé directement sur son crâne depuis sa naissance — selon la légende, il serait sorti de son cocon en criant « À l’attaque pour l’honneur et les gaufres ! » Il défie les Pokémon sauvages à des duels de poésie, vole au secours des baies tombées au sol, et fond en larmes si on lui abîme sa cape. Sa technique signature, Tournoyement Galant, consiste à piquer son adversaire après avoir tourné sur lui-même au moins huit fois, tout en citant du théâtre. Son flair pour le drame est tel que certains chercheurs pensent qu’il est en fait mi-insecte, mi-acteur raté.`,
  types: [shlagemonTypes.poison],
  coefficient: 2,
}

export const ptitocard: BaseShlagemon = {
  id: 'ptitocard',
  name: 'Ptitocard',
  color: '#f9e743',
  description: `Ptitocard est un Shlagémon de type Slope, aussi fragile qu’une biscotte mouillée et aussi expressif qu’un poisson-panique en pleine crise existentielle. Son regard vide, humide et terriblement plaintif fait fondre les cœurs les plus endurcis — ou les agace profondément, au choix. Il coule plus qu’il ne nage, et sa spirale ventrale ne tourne que lorsqu’il fait une crise d’angoisse. Il bave en permanence, mais pas de la bouche : c’est tout son corps qui transpire la détresse. On pense qu’il est triste de naissance, mais certains spécialistes évoquent une simple allergie à la vie. Sa capacité spéciale, *Larme Infinie*, provoque l’ennui mortel chez l’ennemi. Un adversaire qui regarde Ptitocard pendant plus de 10 secondes peut tomber dans un coma d’indifférence profonde. Ptitocard rêve de devenir un grand champion... mais ne fait rien pour. On le trouve souvent flottant à la surface des flaques, en train de se demander s’il mérite vraiment d’évoluer. Spoiler : pas sûr.`,
  types: [shlagemonTypes.eau],
  coefficient: 2,
}

export const goubite: BaseShlagemon = {
  id: 'goubite',
  name: 'Goubite',
  color: '#f9e743',
  description: `Goubite est un Shlagémon de type Slope, difficile à regarder... et encore plus difficile à oublier. Doté d’un corps long et rosâtre, légèrement bombé sur le haut, il est souvent victime de malentendus anatomiques dans les écoles de dresseurs. Pourtant, lui, il s’assume. Fier, droit, et toujours un peu moite. Sa tête est cerclée d’une barbe flasque, dégoulinante de sueur tiède, qu’il secoue parfois pour marquer son territoire. Il sourit en permanence, d’un air satisfait qui met tout le monde mal à l’aise, même les aveugles. Ses pieds sont fripés, velus, et sentent la crevette oubliée dans une chaussette humide. Il se déplace lentement en produisant un petit bruit mou et répétitif, comparable à un bisou dont on ne veut pas. Sa capacité signature, *Giclée Visqueuse*, inflige des dégâts modérés mais impose un malus mental permanent à ceux qui en sont témoins. Certains affirment qu’il peut aussi lancer *Barbe Emotive*, une attaque qui colle et qui sent la salle de muscu humide. À ne pas confondre avec un objet sexuel. Sauf si vraiment on est pressé de consulter.`,
  types: [shlagemonTypes.feu],
  coefficient: 2,
}

export const alaouakbar: BaseShlagemon = {
  id: 'alaouakbar',
  name: 'Alaouakbar',
  color: '#c5a641',
  description: `Considéré comme un sage dans son quartier... du moins par lui-même. Il prétend maîtriser les arts mystiques du *Contrôle du Destin* mais confond souvent télékinésie et procrastination. On le reconnaît à ses deux grosses cuillères de cantine, tordues à force de remuer du thé aux herbes chelou dans des bouteilles de soda. Vêtu d’une djellaba délavée et d’un regard qui voit à travers toi (mais pas très loin), il marmonne des incantations approximatives pendant qu’il fait tourner sa sacoche à bandoulière en plastique doré. Il prétend méditer, mais il dort à 80%. Sa capacité spéciale, *Chakra Perimé*, déséquilibre l’ennemi avec une odeur de patchouli acide et une attaque psychique floue. Il peut aussi invoquer son attaque signature, *Projection Spirituelle*, qui consiste à lancer une cuillère sur son adversaire en hurlant “vision sacrée !” sans grand effet. On le croise souvent assis sur un banc, seul, en train de discuter avec ses propres Pokéball vides.`,
  types: [shlagemonTypes.psy],
  coefficient: 2,
}

export const starters: BaseShlagemon[] = [carapouffe, salamiches, bulgrosboule]
export const allShlagemons: BaseShlagemon[] = [
  carapouffe,
  salamiches,
  bulgrosboule,
  pikachiant,
  mewteub,
  nosferachid,
  rouxPasCool,
  dartagnan,
  ptitocard,
  sacdepates,
  canarchichon,
  goubite,
  alaouakbar,
]
