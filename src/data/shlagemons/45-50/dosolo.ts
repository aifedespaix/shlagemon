import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import dopluspersonne from '../evolutions/dopluspersonne'

export const dosolo: BaseShlagemon = {
  id: 'dosolo',
  name: 'Dosolo',
  description: `Dosolo, l’autruche la plus triste de la région, erre dans les terrains vagues, tête basse et plumes en bataille. Il n’a littéralement aucun ami, même les pigeons l’ignorent. Son plumage, censé être doux et aéré, est tout terne, piqué de miettes de pain et de chewing-gums séchés.  
Il se gratte la tête d’un air perdu, l’air de se demander ce qu’il fout là. Son unique crête est aplatie, comme son moral, et il laisse derrière lui des traces de larmes poussiéreuses dans la boue.  
Son attaque signature, *Coup d’Blues*, plonge l’adversaire dans un désespoir existentiel qui lui fait perdre un tour.  
On raconte qu’il tente souvent de parler à son ombre, mais même elle a fini par se barrer.`,
  descriptionKey: 'data.shlagemons.45-50.dosolo.description',
  types: [shlagemonTypes.normal, shlagemonTypes.vol],
  coefficient: 49,

  evolutions: [{
    base: dopluspersonne,
    condition: {
      type: 'lvl',
      value: 83,
    },
  }],
}

export default dosolo
