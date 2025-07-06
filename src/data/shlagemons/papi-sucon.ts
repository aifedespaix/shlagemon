import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const papysucon: BaseShlagemon = {
  id: 'papysucon',
  name: 'Papi Suçon',
  description: `Papy Suçon est la forme finale de cette lignée de la honte. Il a gardé ses ailes, mais elles sont désormais flétries, poussiéreuses, et sentent la vieille cave humide. Il ne vole plus, il "flotte en gémissant", traînant derrière lui une traînée de bave et de souvenirs gênants.

Vieux, râleur et mou, il marmonne dans sa barbe inexistante des phrases comme "viens là que j’te montre l’amour vrai" ou "moi à mon époque, on suçait avec respect". Son attaque signature, *Suçon Spectral*, inflige des dégâts mentaux et physiques, car il laisse une marque violette là où il frappe, souvent à des endroits non consentis.

Il ne distingue plus les ennemis des alliés. Dès qu’il voit quelque chose bouger, il se met en mode aspiration. Sa bouche se déforme en un entonnoir flasque pendant qu’il fait le bruit de l’amour perdu (*FLUURRRR-PCHHH*).

Sa capacité passive, *Salive Persistante*, ralentit les adversaires qui l’ont approché de trop près, à cause de la texture collante laissée sur leur peau. On raconte qu’un dresseur a tenté de le prendre dans ses bras et s’est retrouvé avec une marque mauve sur le front pendant 4 jours.

Papy Suçon est un type crasse par excellence, mais il est aussi classé *affection*, car il prétend toujours "faire ça avec tendresse".`,
  types: [shlagemonTypes.insecte],
  coefficient: 35,
}

export default papysucon
