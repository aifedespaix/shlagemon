import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const metamorve: BaseShlagemon = {
  id: 'metamorve',
  name: 'Metamorve',
  description: `Une masse de boue nauséabonde qui se traîne lentement. Là où il passe, plus rien ne pousse à cause de sa toxicité. Il est fait d'une boue toxique. Il pollue tout ce qu’il touche, même le sol devient stérile. Il pue tellement que des gens s’évanouissent rien qu’en le croisant. Son corps est un concentré de toxines.`,
  descriptionKey: 'data.shlagemons.05-10.metamorve.description',
  types: [shlagemonTypes.normal],
}

export default metamorve
