import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'

export const ectroudbal: BaseShlagemon = {
  id: 'ectroudbal',
  name: 'Ectroudbal',
  description: `Émanation spectrale d’un esprit trop longtemps resté coincé dans les toilettes d’un bar PMU, Ectroudbal hante les lieux où l’on oublie de tirer la chasse. Sa forme rappelle vaguement un fantôme, mais avec la grâce d’un vieux torchon de WC imbibé de sueur et de mauvaises décisions.

Son corps est couvert de taches suspectes et de traces d'usure en forme de... ben de trous de balle, justement. Certains disent que ce sont des impacts de sorts, d'autres penchent pour une malédiction scatologique. Il flotte en éructant des bruits de chasse d’eau, et laisse derrière lui un sillage de gaz verdâtres qui forment parfois des emojis caca.

Son attaque signature, *Souffle de Troudbal*, relâche un jet gazeux issu de l’au-delà (et de l’en-d’ssous), infligeant de lourds dégâts olfactifs et mentaux. Elle peut provoquer la panique, l’étourdissement, ou un fou rire nerveux chez les plus fragiles.

On raconte qu’Ectroudbal peut apparaître dans tes chiottes si tu dis “Papier triple épaisseur” trois fois devant ton miroir après un kebab trop épicé.`,
  descriptionKey: 'data.shlagemons.evolutions.ectroudbal.description',
  types: [shlagemonTypes.spectre, shlagemonTypes.poison],
}

export default ectroudbal
