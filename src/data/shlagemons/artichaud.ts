import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const artichaud: BaseShlagemon = {
  id: 'artichaud',
  name: 'Artichaud',
  description: `Artichaud est un Shlagémon légendaire qui symbolise le paradoxe ultime : avoir froid en transpirant. Né d’un choc thermique entre une glacière éventrée et une friteuse oubliée, il erre dans les friches industrielles, couvert de givre et de gouttes de sueur en même temps. Ses ailes en plumes de congélateur diffusent une brume glaciale, mais il porte toujours un Marcel trempé et un bonnet en laine boulochée. 

On raconte qu’il est capable de déclencher des tempêtes de neige tiède, et qu’il fond dès qu’il s’énerve — avant de refiger dans la minute qui suit. Des témoins l’auraient aperçu en train de se réchauffer à côté d’un feu… qu’il a lui-même glacé. Il parle en soufflant de la buée chaude, et laisse derrière lui une traînée de taches humides et d’odeurs de soupe tiédie.

Autrefois vénéré comme le “Gardien du Micro-ondes Sacré”, il aurait été banni du royaume des Shlagémons nobles pour avoir tenté de cuire des raviolis surgelés… sans enlever l’opercule métallique.

Aujourd’hui, Artichaud veille sur les zones de non-droit climatiques, où il impose son règne moite et frigorifié, entre deux éternuements fumants et des engelures de l’aisselle.`,
  descriptionKey: 'data.shlagemons.artichaud.description',

  types: [shlagemonTypes.glace, shlagemonTypes.vol],
  coefficient: 110,
}

export default artichaud
