import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const raichiotte: BaseShlagemon = {
  id: 'raichiotte',
  name: 'Raïchiotte',
  description: `Raïchiotte est l’aboutissement tragique de l’évolution de Pikachiant. Il a absorbé tellement d’ondes négatives et de câbles de contrefaçon qu’il est devenu littéralement instable : chaque mouvement déclenche des étincelles involontaires et un léger bruit de chasse d’eau. Il porte en permanence une banane fluo où il range ses powerbanks, ses amendes impayées et quelques trottinettes volées.

Sa queue est devenue un paratonnerre inversé qui attire les problèmes, et son rire grésille comme un haut-parleur saturé. Il attaque avec *Coup de Jus Verbal*, une insulte électrique qui te paralyse de gêne. On le reconnaît facilement grâce à son regard vide, son haleine d’écran brûlé, et sa capacité à pirater un interphone avec une paille.

Même les bornes de recharge refusent de le connecter. Il est considéré comme un bug vivant du Pokédex, et certains dresseurs le fuient, non pas pour sa puissance… mais pour sa conversation.`,
  descriptionKey: 'data.shlagemons.evolutions.raichiotte.description',
  types: [shlagemonTypes.electrique],
}

export default raichiotte
