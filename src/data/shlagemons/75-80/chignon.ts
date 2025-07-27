import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const chignon: BaseShlagemon = {
  id: 'chignon',
  name: 'Chignon',
  description: `Toujours tiré à quatre épingles, Chignon se bat avec des attaques de coiffure redoutables. Il lance ses épingles comme des shurikens et s'arrange pour que tout le monde admire sa queue-de-cheval.`,
  descriptionKey: 'data.shlagemons.75-80.chignon.description',
  types: [shlagemonTypes.combat],
}

export default chignon
