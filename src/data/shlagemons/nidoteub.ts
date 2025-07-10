import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const nidoteub: BaseShlagemon = {
  id: 'nidoteub',
  name: 'Nidoteub',
  description: `Nidoteub est l’évolution naturelle (et pourtant regrettée) de Nidononbinaire♂. Son corps a gonflé, ses pics sont plus rigides que ses arguments, et sa voix porte loin, même quand il dit n’importe quoi. Il passe son temps à scroller des profils de Shlagémon femelles et à crier “Tchooooleeee” dès qu’une silhouette passe dans un rayon de 50 mètres.

Il voue un culte étrange à une entité nommée “Chibrax”, dont il porte un médaillon autour du cou en plastique doré. Personne ne sait qui c’est, ni ce que ça veut dire, mais Nidoteub y croit très fort. Il utilise principalement l’attaque *DM Massif*, qui ne touche presque jamais, mais qui contient beaucoup trop d’émojis feu.

Il est bruyant, inefficace, et persuadé qu’il est “trop stylé”. Ses dents sont toujours en PLS et son haleine est classée comme capacité toxique passive.`,
  types: [shlagemonTypes.poison],
  coefficient: 66,
}

export default nidoteub
