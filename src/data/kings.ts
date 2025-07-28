import type { Character } from '~/type/character'
import type { SavageZoneId } from '~/type/zone'
import type { BaseShlagemon, Trainer } from '~/types'
import { caillou } from './characters/caillou'
import { donaldTrompe } from './characters/donald-trompe'
import { marcon } from './characters/marcon'
import { marineLahaine } from './characters/marine-lahaine'
import { norman } from './characters/norman'
import { ondejeune } from './characters/ondejeune'
import { profMerdant } from './characters/prof-merdant'
import { sachatte } from './characters/sachatte'
import { siphanus } from './characters/siphanus'
import { vladimirPutain } from './characters/vladimir-putain'
import racaillou from './shlagemons/40-45/racaillou'
import onixtamere from './shlagemons/70-75/onixtamere'
import poissaucisse from './shlagemons/85-90/poissaucisse'
import hyporuisseau from './shlagemons/evolutions/hyporuisseau'
import { zonesData } from './zones'

function _createKing(
  zoneId: SavageZoneId,
  character: Character,
  qteShlagemons: number,
  dialogBefore: string,
  dialogAfter: string,
  dialogDefeat: string,
): Trainer {
  const zone = zonesData.find(z => z.id === zoneId)
  if (!zone) {
    throw new Error(`Zone ${zoneId} not found`)
  }
  const levelMax = (zone.maxLevel ?? 1) + 1

  // Gather base shlagemons and their first evolution stage
  const available = zone.shlagemons!
    .flatMap(b => b.evolution?.base ? [b, b.evolution.base] : [b])
    // Remove potential duplicates by id
    .reduce<Record<string, BaseShlagemon>>((acc, mon) => {
      acc[mon.id] = mon
      return acc
    }, {})
  const uniqueMons = Object.values(available)

  const baseMons = uniqueMons.filter(b => b.speciality === 'evolution0')
  const evolvedMons = uniqueMons.filter(b => b.speciality !== 'evolution0')

  let evolCount = qteShlagemons > 6 ? 3 : qteShlagemons > 3 ? 2 : 1
  evolCount = Math.min(evolCount, evolvedMons.length, qteShlagemons)

  const selectedBases = baseMons.slice(0, qteShlagemons - evolCount)
  const selectedEvols = evolvedMons.slice(0, evolCount)
  const selected = [...selectedBases, ...selectedEvols]

  const shlagemons: { baseId: string, level: number }[] = selected.map((b, idx) => ({
    baseId: b.id,
    level: levelMax - (selected.length - 1 - idx),
  }))

  return {
    id: `king-${zoneId}`,
    character,
    dialogBefore,
    dialogAfter,
    dialogDefeat,
    reward: zone.maxLevel || 1,
    shlagemons,
  }
}

type Kings = Record<SavageZoneId, Trainer>

function createStaticShlags(zoneId: SavageZoneId) {
  const level = (zonesData.find(z => z.id === zoneId)?.maxLevel ?? 1) + 1
  return Array.from({ length: 4 }, () => ({ baseId: 'wem', level }))
}

export const kings: Kings = {
  'plaine-kekette': {
    id: 'king-plaine-kekette',
    character: ondejeune,
    reward: zonesData.find(z => z.id === 'plaine-kekette')?.maxLevel || 1,
    dialogBefore: 'Coucou, si tu gagnes, je te paye le petit déjeuné !',
    dialogAfter: 'Ok, ok, tu as gagné, je vais t\'inviter pour ce petit déj !',
    dialogDefeat: 'Mais quel grosse merde, tu vas me payer un petit déj\' de ouf !',
    shlagemons: [
      { baseId: poissaucisse.id, level: 5 },
      { baseId: hyporuisseau.id, level: 6 },
    ],
  },
  'bois-de-bouffon': {
    id: 'king-bois-de-bouffon',
    character: caillou,
    dialogBefore: 'Ici, c\'est ma street, et tu as trop de cheveux pour pouvoir continuer ton chemin.',
    dialogAfter: 'Tu m\'as bien déglingué, bravo ! Je vais aller me faire un shampoing et je reviendrai bien plus fort !',
    dialogDefeat: 'Je vais te faire bouffer tes cheveux espèce de sous merde !',
    reward: zonesData.find(z => z.id === 'bois-de-bouffon')?.maxLevel || 1,
    shlagemons: [
      { baseId: racaillou.id, level: 5 },
      { baseId: onixtamere.id, level: 6 },
    ],
  },
  'chemin-du-slip': {
    id: 'king-chemin-du-slip',
    character: norman,
    dialogBefore: 'Entres dans ma grotte si tu l\'oses.',
    dialogAfter: 'Ta victoire ne sera que temporaire, je retourne en garde à vue.',
    dialogDefeat: 'Tu pues la lose, file te laver !',
    reward: zonesData.find(z => z.id === 'chemin-du-slip')?.maxLevel || 1,
    shlagemons: createStaticShlags('chemin-du-slip'),
  },
  'ravin-fesse-molle': {
    id: 'king-ravin-fesse-molle',
    character: marineLahaine,
    dialogBefore: 'Yo, j\'suis raciste.',
    dialogAfter: 'Incroyable... tu as gagné. Je vais donc arrêter d\'être raciste. Merci de m\'avoir ouvert les yeux !',
    dialogDefeat: 'Dégage ! Retourne dans ton pays !',
    reward: zonesData.find(z => z.id === 'ravin-fesse-molle')?.maxLevel || 1,
    shlagemons: createStaticShlags('ravin-fesse-molle'),
  },
  'precipice-nanard': {
    id: 'king-precipice-nanard',
    character: marcon,
    dialogBefore: 'Je suis prêt à te mettre une sacrée rouste espèce de cassos ! Je déteste les pauvres comme toi, sale bâtard !',
    dialogAfter: 'Tu m\'as explosé le fiak, je vais te foutre une grosse loi dans ta gueule, ça va te calmer.',
    dialogDefeat: 'T\'es une merde, t\'as toujours été une merde, tu resteras une merde toute ta vie.',
    reward: zonesData.find(z => z.id === 'precipice-nanard')?.maxLevel || 1,
    shlagemons: createStaticShlags('precipice-nanard'),
  },
  'marais-moudugenou': {
    id: 'king-marais-moudugenou',
    character: siphanus,
    dialogBefore: 'J\'ai des infos sur la sortie de la prochaine Switch !',
    dialogAfter: 'Tu t\'extirpes du marais victorieux, tu ne sauras donc jamais quand la prochaine Switch va sortir...',
    dialogDefeat: 'Je t\'éclabousse de ma boue, retourne barboter ailleurs.',
    reward: zonesData.find(z => z.id === 'marais-moudugenou')?.maxLevel || 1,
    shlagemons: createStaticShlags('marais-moudugenou'),
  },
  'forteresse-petmoalfiak': {
    id: 'king-forteresse-petmoalfiak',
    character: donaldTrompe,
    dialogBefore: 'Ma forteresse est imprenable, j\'y ai construit un mur titanesque !',
    dialogAfter: 'Tu as brisé ma forteresse... je vais te niquer ton père.',
    dialogDefeat: 'Boum ! Ma forteresse t\'écrase, petit looser de mort ! J\'te baise !',
    reward: zonesData.find(z => z.id === 'forteresse-petmoalfiak')?.maxLevel || 1,
    shlagemons: createStaticShlags('forteresse-petmoalfiak'),
  },
  'route-du-nawak': {
    id: 'king-route-du-nawak',
    character: caillou,
    dialogBefore: 'Perds-toi sur cette route!',
    dialogAfter: 'Tu t\'en sors, pour l\'instant.',
    dialogDefeat: 'Complètement paumé ? Je t\'ai laissé sur le bord, tocard.',
    reward: zonesData.find(z => z.id === 'route-du-nawak')?.maxLevel || 1,
    shlagemons: createStaticShlags('route-du-nawak'),
  },
  'mont-dracatombe': {
    id: 'king-mont-dracatombe',
    character: norman,
    dialogBefore: 'Le sommet est pour les braves!',
    dialogAfter: 'Le mont te cede la victoire.',
    dialogDefeat: 'T\'es moins drôle que mes vannes foireuses, dégage.',
    reward: zonesData.find(z => z.id === 'mont-dracatombe')?.maxLevel || 1,
    shlagemons: createStaticShlags('mont-dracatombe'),
  },
  'catacombes-merdifientes': {
    id: 'king-catacombes-merdifientes',
    character: marineLahaine,
    dialogBefore: 'Les catacombes sont ton futur tombeau.',
    dialogAfter: 'Je sombre dans l\'ombre des catacombes.',
    dialogDefeat: 'Remonte donc à la surface, larve.',
    reward: zonesData.find(z => z.id === 'catacombes-merdifientes')?.maxLevel || 1,
    shlagemons: createStaticShlags('catacombes-merdifientes'),
  },
  'route-aguicheuse': {
    id: 'king-route-aguicheuse',
    character: marcon,
    dialogBefore: 'Tentes-tu ta chance ici?',
    dialogAfter: 'Bien joué, voyageur.',
    dialogDefeat: 'Président 1 - Toi 0. Allez, file avant que je te taxe.',
    reward: zonesData.find(z => z.id === 'route-aguicheuse')?.maxLevel || 1,
    shlagemons: createStaticShlags('route-aguicheuse'),
  },
  'vallee-des-chieurs': {
    id: 'king-vallee-des-chieurs',
    character: sachatte,
    dialogBefore: 'Personne ne ressort de cette grotte.',
    dialogAfter: 'Tu as dompte la puanteur.',
    dialogDefeat: 'Même tes pets n\'effraient personne, perdant.',
    reward: zonesData.find(z => z.id === 'vallee-des-chieurs')?.maxLevel || 1,
    shlagemons: createStaticShlags('vallee-des-chieurs'),
  },
  'trou-du-bide': {
    id: 'king-trou-du-bide',
    character: caillou,
    dialogBefore: 'Mon trou ne te fera pas de cadeau.',
    dialogAfter: 'Je m\'incline... pour cette fois.',
    dialogDefeat: 'Même mon trou a plus de talent que toi.',
    reward: zonesData.find(z => z.id === 'trou-du-bide')?.maxLevel || 1,
    shlagemons: createStaticShlags('trou-du-bide'),
  },
  'zone-giga-zob': {
    id: 'king-zone-giga-zob',
    character: profMerdant,
    dialogBefore: 'Bienvenue en enfer!',
    dialogAfter: 'Impossible... comment as-tu fait ?',
    dialogDefeat: 'Hop, direction les rattrapages, minus !',
    reward: zonesData.find(z => z.id === 'zone-giga-zob')?.maxLevel || 1,
    shlagemons: createStaticShlags('zone-giga-zob'),
  },
  'route-so-dom': {
    id: 'king-route-so-dom',
    character: marcon,
    dialogBefore: 'Je vais te retourner comme une crêpe !',
    dialogAfter: `Tu me l'as mise bien profonde, mais je reviendrai plus fort !`,
    dialogDefeat: `T'es ma pute, je fais ce que je veux de toi !`,
    reward: zonesData.find(z => z.id === 'route-so-dom')?.maxLevel || 1,
    shlagemons: createStaticShlags('route-so-dom'),
  },
  'lac-aux-relous': {
    id: 'king-lac-aux-relous',
    character: vladimirPutain,
    dialogBefore: 'Я люблю хорошие ясли из кулей',
    dialogAfter: 'Я люблю тебя, хочешь pойти со мной на свидание?',
    dialogDefeat: 'Я засунул свой палец тебе в задницу',
    reward: zonesData.find(z => z.id === 'lac-aux-relous')?.maxLevel || 1,
    shlagemons: createStaticShlags('lac-aux-relous'),
  },
  'canyon-a-la-derp': {
    id: 'king-canyon-a-la-derp',
    character: donaldTrompe,
    dialogBefore: 'Ce canyon est le plus grand et le plus beau du monde, tu ne peux pas le nier !',
    dialogAfter: 'Tu as réussi à traverser le canyon, mais je reviendrai plus fort ! ',
    dialogDefeat: 'Tu es un perdant, tu ne mérites pas de traverser ce canyon !',
    reward: zonesData.find(z => z.id === 'canyon-a-la-derp')?.maxLevel || 1,
    shlagemons: createStaticShlags('canyon-a-la-derp'),
  },
  'cratere-des-legends': {
    id: 'king-cratere-des-legends',
    character: donaldTrompe,
    dialogBefore: 'Ce cratère est le plus grand et le plus beau du monde, tu ne peux pas le nier !',
    dialogAfter: 'Tu as réussi à traverser le cratère, mais je reviendrai plus fort ! ',
    dialogDefeat: 'Tu es un perdant, tu ne mérites pas de traverser ce cratère !',
    reward: zonesData.find(z => z.id === 'cratere-des-legends')?.maxLevel || 1,
    shlagemons: createStaticShlags('cratere-des-legends'),
  },
  'mont-kouillasse': {
    id: 'king-mont-kouillasse',
    character: donaldTrompe,
    dialogBefore: 'Ce mont est le plus grand et le plus beau du monde, tu ne peux pas le nier!',
    dialogAfter: 'Tu as réussi à traverser le mont, mais je reviendrai plus fort !',
    dialogDefeat: 'Tu es un perdant, tu ne mérites pas de traverser ce mont !',
    reward: zonesData.find(z => z.id === 'mont-kouillasse')?.maxLevel || 1,
    shlagemons: createStaticShlags('mont-kouillasse'),
  },
  'paturage-crado': {
    id: 'king-paturage-crado',
    character: donaldTrompe,
    dialogBefore: 'Ce pâturage est le plus grand et le plus beau du monde, tu ne peux pas le nier !',
    dialogAfter: 'Tu as réussi à traverser le pâturage, mais je reviendrai plus fort !',
    dialogDefeat: 'Tu es un perdant, tu ne mérites pas de traverser ce pâturage !',
    reward: zonesData.find(z => z.id === 'paturage-crado')?.maxLevel || 1,
    shlagemons: createStaticShlags('paturage-crado'),
  },
}
