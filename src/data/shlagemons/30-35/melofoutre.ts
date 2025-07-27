import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import meladolphe from '../evolutions/meladolphe'

export const melofoutre: BaseShlagemon = {
  id: 'melofoutre',
  name: 'Mélofoutre',
  description: `Mélofoutre est un petit être visqueux à l’apparence faussement candide. Né dans une éprouvette d’amour non-consenti entre une étoile filante et une chaussette oubliée sous un lit d'ado, il brille d’un éclat douteux, oscillant entre le nacré et le gluant.

Sa voix flûtée fait vibrer l’air comme une vieille VHS de film interdit, et sa capacité signature, *Berceuse Mouillée*, endort l’ennemi sous un flot de soupirs gênants. Il peut aussi lancer *Giclée Cosmique*, une attaque magique à la trajectoire imprévisible, qui laisse des taches indélébiles sur l’estime de soi.

Mélofoutre ne cherche pas le combat, mais s’y retrouve souvent par accident… ou par pulsion. Toujours collant, jamais touchant, il est l’anti-héros des berceuses.`,
  descriptionKey: 'data.shlagemons.30-35.melofoutre.description',

  types: [shlagemonTypes.fee, shlagemonTypes.normal],
  evolution: {
    base: meladolphe,
    condition: {
      type: 'lvl',
      value: 70,
    },
  },
}

export default melofoutre
