import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import tatacruelle from '../evolutions/tatacruelle'

export const tatacool: BaseShlagemon = {
  id: 'tatacool',
  name: 'Tatacool',
  description: `Tatacool traîne dans les flaques d’eau croupie derrière les zones industrielles, en rêvant de sa jeunesse où il barbotait dans la piscine municipale. Son corps gélatineux a viré au gris-bleu délavé, constellé de taches de rouille et d’algues collées. Ses deux "joyaux" emblématiques sont désormais des boules de naphtaline fendues, ternies, dont sortent parfois des bulles douteuses.  

Ses tentacules sont tout mous, comme s’il avait passé trois semaines à tremper dans l’eau de vaisselle. Il a des cernes violets sous ses petits yeux hagards, et son regard alterne entre le vide total et une suspicion inexplicable. Il se tient à moitié vautré, comme s’il venait de glisser sur une moule.  

Son attaque signature, *Jet de Morve Aquatique*, asperge l’adversaire d’un mélange visqueux d’eau sale et de morve verte, qui colle pendant des heures. Certains disent qu’il peut aussi faire “Bulle à Pisse” dans les grandes occasions, mais personne ne veut vérifier.  

On raconte que Tatacool collectionne les bouchons de bière et les vieux tickets de bus échoués dans son eau, persuadé que ça porte chance.`,
  descriptionKey: 'data.shlagemons.40-45.tatacool.description',
  types: [shlagemonTypes.eau, shlagemonTypes.poison],
  evolution: {
    base: tatacruelle,
    condition: {
      type: 'lvl',
      value: 53,
    },
  },

}

export default tatacool
