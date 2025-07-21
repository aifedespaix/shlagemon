import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import triopikouze from '../evolutions/triopikouze'

export const taupicouze: BaseShlagemon = {
  id: 'taupicouze',
  name: 'Taupicouze',
  description: `Taupicouze s’est improvisé infirmier de quartier après un stage de 3 semaines non validé dans un centre de désintox. Armé de seringues douteuses et d’un stéthoscope qui sent la cave, il surgit sans prévenir pour "faire une petite piqûre", souvent sans demander le consentement.

Son problème ? Il ne trouve *jamais* la veine. Il plante, il retire, il re-plante… et il jubile. Car derrière son sourire crispant, se cache une âme légèrement sadique. Il adore les cris d’agonie, qu’il interprète comme des encouragements.

Son attaque signature, *Tricouze Saignante*, inflige des dégâts progressifs et désoriente l’ennemi avec une sensation de malaise médical. Il peut aussi utiliser *Piqure Surprise*, qui a 30% de chances de faire perdre connaissance à un Shlagémon... ou au dresseur.`,
  descriptionKey: 'data.shlagemons.25-30.taupicouze.description',
  types: [shlagemonTypes.sol],
  coefficient: 26,
  evolution: {
    base: triopikouze,
    condition: {
      type: 'lvl',
      value: 38,
    },
  },
}

export default taupicouze
