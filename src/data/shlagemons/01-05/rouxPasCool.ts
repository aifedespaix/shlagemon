import type { BaseShlagemon } from '~/type'
import { shlagemonTypes } from '../../shlagemons-type'
import rouxScoop from '../evolutions/roux-scoop'

export const rouxPasCool: BaseShlagemon = {
  id: 'roux-pas-cool',
  name: 'Roux pas Cool',
  description: `Roux pas Cool était anciennement cool. Roux pas Cool a passé trop de temps à gratter des accords mineurs au bord d’un volcan éteint. Désormais, Roux pas Cool erre avec une guitare trop grande pour ses ailes, des taches de rousseur qui pleurent, et une chemise à carreaux qui sent l’herbe humide et les regrets. Son plumage a pris une teinte rouille triste, et sa mèche rousse cache un regard empli de remords, comme s’il réalisait constamment qu’il aurait pu évoluer en rapace légendaire, mais a préféré sortir un EP en indépendant. Il fait toujours un peu froid autour de lui, même en plein été. Sa capacité signature, Refrain Gênant, inflige un malaise profond à toute l’arène, réduisant la précision des attaques ennemies tant qu’ils détournent le regard. Il est très doué pour faire fuir les Pokémon sauvages… et les rendez-vous galants.`,
  descriptionKey: 'data.shlagemons.01-05.rouxPasCool.description',
  types: [shlagemonTypes.vol],
  evolution: { base: rouxScoop, condition: { type: 'lvl', value: 18 } },
  speciality: 'evolution0',
}
export default rouxPasCool
