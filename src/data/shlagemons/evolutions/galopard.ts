import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const galopard: BaseShlagemon = {
  id: 'galopard',
  name: 'Galopard',
  description: `Galopard était autrefois un fier destrier, mais aujourd’hui il traîne sa carcasse devant les PMU, recouvert d’un vieux tapis à la place de sa crinière flamboyante. Ses sabots sont couverts de chewing-gums et il porte souvent un gilet jaune taché, trouvé lors d’une manif. Sa flamme ne brûle plus vraiment, elle fume comme une clope mal éteinte.

Son attaque signature, *Jet de Binouze*, consiste à asperger ses adversaires de bière tiède, ce qui réduit leur motivation à se battre. On dit qu’il passe ses journées à râler contre “les jeunes” et à raconter qu’à son époque, il courait bien plus vite.

Il n’aime qu’une seule chose : quand la France gagne au tiercé.`,
  descriptionKey: 'data.shlagemons.evolutions.galopard.description',
  types: [shlagemonTypes.feu],
}

export default galopard
