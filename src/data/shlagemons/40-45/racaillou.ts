import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import gravaglaire from '../evolutions/gravaglaire'

export const racaillou: BaseShlagemon = {
  id: 'racaillou',
  name: 'Racaillou',
  description: `Racaillou traîne toute la journée affalé contre un muret tagué, les bras ballants, le regard vitreux sous sa casquette trop grande. Son corps, vaguement rocailleux, est constellé de mégots incrustés et de petits sachets douteux. Sa peau grise est couverte de graffitis, et on dirait qu'il a essayé de cacher ses cernes avec des stickers Panini.

Sa gueule affiche en permanence un sourire narquois, trois dents en or, et un air de te tester pour rien. Il propose aux autres Shlagémons de la “bonne verte” en marmonnant, tout en gardant une main dans sa banane Lacoste déchirée.

**Attaque signature :** *Émanation douteuse* — Racaillou relâche un nuage de fumée nauséabonde qui fait planer tout le monde dans un rayon de 2 mètres, embrouillant les esprits et ralentissant les adversaires.

On raconte qu'il ne se déplace jamais sans sa bande de Gravashlag, toujours prêts à lui fournir un briquet ou à jeter un caillou sur un dresseur trop curieux.`,
  types: [shlagemonTypes.roche, shlagemonTypes.sol],
  coefficient: 45,
  evolution: {
    base: gravaglaire,
    condition: {
      type: 'lvl',
      value: 76,
    },
  },
}

export default racaillou
