import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const parasecte: BaseShlagemon = {
  id: 'parasecte',
  name: 'Parasecte',
  description: `Parasecte n’est plus vraiment un shlagémon. C’est un message. Une vision. Un ancien Plégique ayant fusionné corps et âme avec son champignon, jusqu’à devenir la bouche béante d’un mouvement spirituel douteux qu’il appelle simplement "le Cycle Humide".

Il est vêtu de spores pendantes formant une sorte de toge naturelle, maculée de symboles dessinés à la moisissure. Il plane perpétuellement à 2 cm du sol — non pas par magie, mais parce qu’il est trop collant pour s’en détacher. Son regard fixe et vide traverse les êtres, comme s’il voyait déjà leur décomposition.

Il ne combat pas. Il *évangélise*. Ses disciples, surnommés les "Ferments", répandent sa parole dans les canalisations et les parkings souterrains. Leur rituel d’initiation ? Dormir 48h dans un tupperware humide en écoutant des prêches marmonnés à travers un masque chirurgical usagé.

Son attaque signature, *Révélation Sporale*, libère une explosion de spores qui oblige l’ennemi à méditer sur le sens de la moisissure. L’attaque *Bénédiction Fongique* soigne tous les alliés, mais remplace leur libre arbitre par une envie irrépressible de réciter des textes à voix basse dans des buanderies.

Parasecte ne cherche pas la victoire. Il cherche *l’humidité universelle*. Et toi, es-tu prêt à entendre l’appel du Champi Total ?`,
  descriptionKey: 'data.shlagemons.evolutions.parasecte.description',
  types: [shlagemonTypes.poison, shlagemonTypes.spectre],
  speciality: 'evolution1',
}
export default parasecte
