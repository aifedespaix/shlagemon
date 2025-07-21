import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import krabbolosse from '../evolutions/krabbolosse'

export const krabbyjaccob: BaseShlagemon = {
  id: 'krabbyjaccob',
  name: 'Krabbyjaccob',
  description: `Ce crustacé porte une petite kippa et danse sans arrêt comme dans le vieux film dont il est fan. Entre deux blagues douteuses, il pince tout ce qui traîne pour vérifier si c'est cashèr.`,
  descriptionKey: 'data.shlagemons.70-75.krabbyjaccob.description',
  types: [shlagemonTypes.eau],
  coefficient: 73,
  evolution: {
    base: krabbolosse,
    condition: { type: 'lvl', value: 79 },
  },
}

export default krabbyjaccob
