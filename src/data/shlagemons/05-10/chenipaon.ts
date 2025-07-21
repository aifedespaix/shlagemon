import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import chrysachier from '../evolutions/chrysachier'

export const chenipaon: BaseShlagemon = {
  id: 'chenipaon',
  name: 'Chenipaon',
  evolution: {
    base: chrysachier,
    condition: {
      type: 'lvl',
      value: 14,
    },
  },
  description: `Chenipaon est une larve flamboyante, fruit improbable d’une chenille miteuse et d’un paon beaucoup trop narcissique. Il se déplace lentement, en traînant derrière lui une traîne de plumes multicolores qu’il a lui-même collées à la salive sur son dos mou. Ces plumes ne servent à rien, sauf à faire des "claquettes dramatiques" quand il se retourne brusquement.

Sa parade nuptiale est un désastre chorégraphique où il tourne sur lui-même en hurlant "GRAAAAAAAH-PAOON", ce qui a pour effet de faire fuir 90% des êtres vivants à proximité, y compris les pierres. Les rares adversaires qui restent sont hypnotisés par la laideur fascinante de sa danse, ce qui donne à Chenipaon un court avantage stratégique.

Son cri officiel est enregistré dans les bases de données comme *"KRRRR-païïïïïïïïïïïïïïïïïn"*, mais chaque spécimen semble inventer le sien sur le moment, généralement accompagné d’un effet sonore de flûte désaccordée et d’un éternuement humide.

Il possède l’attaque spéciale *Roule Par Terre Coloré*, qui inflige des dégâts aléatoires et laisse des plumes toxiques sur le champ de bataille. Il peut également utiliser *Faux Charisme*, qui augmente brièvement son taux de critique en fonction du nombre de regards consternés qu’il reçoit.`,
  descriptionKey: 'data.shlagemons.05-10.chenipaon.description',
  types: [shlagemonTypes.insecte],
  coefficient: 2,
}

export default chenipaon
