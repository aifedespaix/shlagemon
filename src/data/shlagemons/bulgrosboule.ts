import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const bulgrosboule: BaseShlagemon = {
  id: 'bulgrosboule',
  name: 'Bulgrosboule',
  description: `Bulgrosboule est connu pour ses fesses titanesques capables d’éclipser le soleil couchant. Il avance à reculons, plus par fierté que par stratégie, laissant échapper des bulles parfumées d’une zone que les dresseurs préfèrent ne pas mentionner. Son cri ressemble à un bain moussant sous pression, et sa capacité signature, *Éruption Fessale*, propulse ses ennemis dans une brume tiède et collante. Doté d’une peau rebondie comme une piscine gonflable de brocante, il adore rebondir sur place en gloussant, ce qui désoriente la plupart des adversaires. Bulgrosboule est très affectueux, surtout avec ceux qui le massent. Attention toutefois : s’il se met à trembler des miches, c’est trop tard. Il va buller.`,
  types: [shlagemonTypes.plante],
  coefficient: 1,
}

export default bulgrosboule
