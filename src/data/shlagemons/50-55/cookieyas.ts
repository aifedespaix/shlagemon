import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import crustabridou from '../evolutions/crustabridou'

export const cookieyas: BaseShlagemon = {
  id: 'cookieyas',
  name: 'Cookieyas',
  description: `Cookieyas ressemble à un Kokiyas qui aurait fusionné avec un vieux cookie tombé derrière le micro-ondes. Son coquillage est à moitié remplacé par une pâte brisée, toute molle et couverte de miettes douteuses. Il a des éclats de chocolat en guise de dents et des pépites incrustées jusque dans ses yeux globuleux, toujours à moitié fermés par la fatigue.

Sa couleur varie entre le brun cramé et le beige sec, avec parfois des taches de lait caillé ou de confiture séchée sur la carapace. Son expression est un mélange de flemme totale et de suspicion envers quiconque s'approche trop près de "son coin de cuisine".

Attitude générale : Cookieyas passe sa vie vautré dans les miettes, grognant quand on tente de le déloger, et se déplace en laissant une traînée collante derrière lui. Son attaque signature, *Jet de Lait Passé*, consiste à cracher un jet de lait périmé sur ses adversaires, infligeant des dégâts collants et une honte olfactive intense.

On raconte que Cookieyas ne rêve que d’une chose : qu’on le laisse tranquille pour finir sa sieste au chaud derrière la cafetière. Mais gare à celui qui essaie de le grignoter : il mord, et c’est sec !`,
  descriptionKey: 'data.shlagemons.50-55.cookieyas.description',
  types: [shlagemonTypes.eau],
  coefficient: 53,

  evolution: {
    base: crustabridou,
    condition: {
      type: 'lvl',
      value: 61,
    },
  },
}

export default cookieyas
