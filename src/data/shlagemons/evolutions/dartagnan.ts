import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const dartagnan: BaseShlagemon = {
  id: 'dartagnan',
  name: 'D\'Art Tagnan',
  description: `D\'Art Tagnan est un Mousquépique de type panache combatif. Toujours prêt à pérorer avant de piquer, il surgit d’un nuage de poussière dramatique en criant « En garde, manant ! », alors que personne ne l’a regardé. Avec ses dards en forme de rapières et ses antennes sculptées en bouclettes, il enchaîne les moulinets dans le vide juste pour le style. Sa moustache n’existe pas, mais il la twiste régulièrement du bout des griffes, persuadé que ça le rend irrésistible. Son chapeau à plume est greffé directement sur son crâne depuis sa naissance — selon la légende, il serait sorti de son cocon en criant « À l’attaque pour l’honneur et les gaufres ! » Il défie les Pokémon sauvages à des duels de poésie, vole au secours des baies tombées au sol, et fond en larmes si on lui abîme sa cape. Sa technique signature, Tournoyement Galant, consiste à piquer son adversaire après avoir tourné sur lui-même au moins huit fois, tout en citant du théâtre. Son flair pour le drame est tel que certains chercheurs pensent qu’il est en fait mi-insecte, mi-acteur raté.`,
  descriptionKey: 'data.shlagemons.evolutions.dartagnan.description',
  types: [shlagemonTypes.poison],
}

export default dartagnan
