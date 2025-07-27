import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import nidodragqueen from './nidodragqueen'

export const nidoteub: BaseShlagemon = {
  id: 'nidoteub',
  name: 'Nidoteub',
  description: `Nidoteub est l’évolution naturelle (et pourtant regrettée) de Nidononbinaire♂. Son corps a gonflé, ses pics sont plus rigides que ses arguments, et sa voix porte loin, même quand iel dit n’importe quoi. Iel passe son temps à scroller des profils de Shlagémon femelles et à crier “Tchooooleeee” dès qu’une silhouette passe dans un rayon de 50 mètres.

Iel voue un culte étrange à une entité nommée “Chibrax”, dont iel porte un médaillon autour du cou en plastique doré. Personne ne sait qui c’est, ni ce que ça veut dire, mais Nidoteub y croit très fort. Iel utilise principalement l’attaque *DM Massif*, qui ne touche presque jamais, mais qui contient beaucoup trop d’émojis feu.

Iel est bruyant·e, inefficace, et persuadé·e qu’iel est “trop stylé”. Ses dents sont toujours en PLS et son haleine est classée comme capacité toxique passive.`,
  descriptionKey: 'data.shlagemons.evolutions.nidoteub.description',
  types: [shlagemonTypes.poison],

  evolution: {
    base: nidodragqueen,
    condition: {
      type: 'lvl',
      value: 88,
    },
  },
}

export default nidoteub
