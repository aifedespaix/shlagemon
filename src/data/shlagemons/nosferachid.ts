import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../shlagemons-type'

export const nosferachid: BaseShlagemon = {
  id: 'nosferachid',
  name: 'Nosferachid',
  description: `Nosferachid est nocturne et fier de l’être. Originaire d’un quartier poussiéreux à l’ombre des HLM de Kanto-Ouest, il vole en rasant les murs avec sa sacoche Louis Viton™ (orthographe non contractuelle), achetée 7 Pokédollars au marché aux puces de Celadop-les-Bains. Il arbore fièrement une casquette visière plate LV assortie, portée en biais pour maximiser l’aérodynamisme et l’attitude. Derrière ses grandes ailes décharnées se cache un petit sachet de "poudre mystique", qu’il dit être pour ses Pokémon... mais personne n’y croit. Nosferachid passe ses nuits à zoner en cercle autour des lampadaires, tout en freestyleant des menaces inaudibles à base de “j’te croque ta daronne” en ultrason. Il attaque rarement de front : il préfère t’endormir avec *Haleine Mentholée Menthe Forte* avant de te vider ton inventaire. On dit qu’il a déjà mordu un Ronflex pour une histoire de briquet. Ronflex dort encore, mais pas pour les bonnes raisons.`,
  types: [shlagemonTypes.poison, shlagemonTypes.vol],
  coefficient: 2,
}

export default nosferachid
