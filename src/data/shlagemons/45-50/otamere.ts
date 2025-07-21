import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import lamantinedu38 from '../evolutions/lamantinedu38'

export const otamere: BaseShlagemon = {
  id: 'otamere',
  name: 'Otamère',
  description: `Otamère est la honte de la banquise. Dégoulinant de flotte, il passe ses journées vautré sur des glaçons fondus, la langue pendante, le regard perdu dans le vide. Son pelage, autrefois blanc, est devenu gris-jaune à force de se rouler dans la crasse et de sniffer les flaques douteuses du port.

Son attaque signature, *Jet de Morve Polaire*, consiste à éternuer un glaçon baveux sur ses adversaires, ce qui leur colle un rhume pour trois semaines. On raconte qu’Otamère est interdit de piscine municipale depuis un incident impliquant une bouée percée et un lot de frites en mousse moisis.

Personne n’a jamais vu Otamère sobre. Il aurait soi-disant un tatouage “MAMAN” sous une nageoire, mais personne n’ose vérifier.`,
  descriptionKey: 'data.shlagemons.45-50.otamere.description',
  types: [shlagemonTypes.eau],
  coefficient: 50,

  evolution: {
    base: lamantinedu38,
    condition: {
      type: 'lvl',
      value: 90,
    },
  },
}

export default otamere
