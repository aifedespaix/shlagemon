import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import aerobite from '../evolutions/aerobite'

export const grosmitoss: BaseShlagemon = {
  id: 'grosmitoss',
  name: 'GrosMitoss',
  description: `GrosMitoss est un concentré de poils, de mauvaise foi et de fabulations. Son corps sphérique et pelucheux dissimule un cerveau saturé de bobards : il prétend avoir battu un Nidodragqueen avec une feuille de salade, connu Mewteub à l'école primaire, et participé à la création de Shlagémon — rien que ça.

Il parle sans arrêt, même quand personne ne l’écoute, et chaque phrase commence par "C’est vrai, j’te jure !". Les autres Shlagémons le fuient, non pas pour ses attaques, mais pour sa capacité à déformer la réalité à chaque mot. 

Sa compétence spéciale, *Mythobluff*, embrouille l’adversaire en lui faisant douter de tout — y compris de ses propres attaques. Il peut aussi utiliser *Souffle de Pipeau*, un vent nauséabond qui sent fort la mauvaise excuse et la clope froide.`,
  types: [shlagemonTypes.insecte, shlagemonTypes.poison],
  coefficient: 28,
  evolution: {
    base: aerobite,
    condition: {
      type: 'lvl',
      value: 69,
    },
  },

}

export default grosmitoss
