import type { Character } from '~/type/character'
import type { SavageZoneId } from '~/type/zone'
import type { BaseShlagemon, Trainer } from '~/types'
import { caillou } from './characters/caillou'
import { donaldTrompe } from './characters/donald-trompe'
import { marcon } from './characters/marcon'
import { marineLahaine } from './characters/marine-lahaine'
import { norman } from './characters/norman'
import { profMerdant } from './characters/prof-merdant'
import { sachatte } from './characters/sachatte'
import { siphanus } from './characters/siphanus'
import { vladimirPutain } from './characters/vladimir-putain'
import { zonesData } from './zones'

function createKing(
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

  const selected = uniqueMons.slice(0, qteShlagemons).reverse()

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

export const kings: Kings = {
  'plaine-kekette': createKing(
    'plaine-kekette',
    caillou,
    2,
    'Ici, c\'est ma street, et tu as trop de cheveux pour pouvoir continuer ton chemin.',
    'Tu m\'as bien déglingué, bravo ! Je vais aller me faire un shampoing et je reviendrai bien plus fort !',
    'Je vais te faire bouffer tes cheveux espèce de sous merde !',
  ),
  'bois-de-bouffon': createKing(
    'bois-de-bouffon',
    sachatte,
    3,
    'Ces bois seront ta tombe. Et je vais t\'y griffer !',
    'Je reviendrai plus forte, avec les ongles encore plus aiguisés.',
    'Tes griffes sont émoussées, je t\'ai humilié, sale chien de tes morts !',
  ),
  'chemin-du-slip': createKing(
    'chemin-du-slip',
    norman,
    4,
    'Entres dans ma grotte si tu l\'oses.',
    'Ta victoire ne sera que temporaire, je retourne en garde à vue.',
    'Tu pues la lose, file te laver !',
  ),
  'ravin-fesse-molle': createKing(
    'ravin-fesse-molle',
    marineLahaine,
    4,
    'Yo, j\'suis raciste.',
    'Incroyable... tu as gagné. Je vais donc arrêter d\'être raciste. Merci de m\'avoir ouvert les yeux !',
    'Dégage ! Retourne dans ton pays !',
  ),
  'precipice-nanard': createKing(
    'precipice-nanard',
    marcon,
    5,
    'Je suis prêt à te mettre une sacrée rouste espèce de cassos ! Je déteste les pauvres comme toi, sale bâtard !',
    'Tu m\'as explosé le fiak, je vais te foutre une grosse loi dans ta gueule, ça va te calmer.',
    'T\'es une merde, t\'as toujours été une merde, tu resteras une merde toute ta vie.',
  ),
  'marais-moudugenou': createKing(
    'marais-moudugenou',
    siphanus,
    5,
    'J\'ai des infos sur la sortie de la prochaine Switch !',
    'Tu t\'extirpes du marais victorieux, tu ne sauras donc jamais quand la prochaine Switch va sortir...',
    'Je t\'éclabousse de ma boue, retourne barboter ailleurs.',
  ),
  'forteresse-petmoalfiak': createKing(
    'forteresse-petmoalfiak',
    donaldTrompe,
    5,
    'Ma forteresse est imprenable, j\'y ai construit un mur titanesque !',
    'Tu as brisé ma forteresse... je vais te niquer ton père.',
    'Boum ! Ma forteresse t\'écrase, petit looser de mort ! J\'te baise !',
  ),
  'route-du-nawak': createKing(
    'route-du-nawak',
    caillou,
    6,
    'Perds-toi sur cette route!',
    'Tu t\'en sors, pour l\'instant.',
    'Complètement paumé ? Je t\'ai laissé sur le bord, tocard.',
  ),
  'mont-dracatombe': createKing(
    'mont-dracatombe',
    norman,
    6,
    'Le sommet est pour les braves!',
    'Le mont te cede la victoire.',
    'T\'es moins drôle que mes vannes foireuses, dégage.',
  ),
  'catacombes-merdifientes': createKing(
    'catacombes-merdifientes',
    marineLahaine,
    6,
    'Les catacombes sont ton futur tombeau.',
    'Je sombre dans l\'ombre des catacombes.',
    'Remonte donc à la surface, larve.',
  ),
  'route-aguicheuse': createKing(
    'route-aguicheuse',
    marcon,
    6,
    'Tentes-tu ta chance ici?',
    'Bien joué, voyageur.',
    'Président 1 - Toi 0. Allez, file avant que je te taxe.',
  ),
  'vallee-des-chieurs': createKing(
    'vallee-des-chieurs',
    sachatte,
    7,
    'Personne ne ressort de cette grotte.',
    'Tu as dompte la puanteur.',
    'Même tes pets n\'effraient personne, perdant.',
  ),
  'trou-du-bide': createKing(
    'trou-du-bide',
    caillou,
    7,
    'Mon trou ne te fera pas de cadeau.',
    'Je m\'incline... pour cette fois.',
    'Même mon trou a plus de talent que toi.',
  ),
  'zone-giga-zob': createKing(
    'zone-giga-zob',
    profMerdant,
    7,
    'Bienvenue en enfer!',
    'Impossible... comment as-tu fait ?',
    'Hop, direction les rattrapages, minus !',
  ),
  'route-so-dom': createKing(
    'route-so-dom',
    marcon,
    8,
    'Je vais te retourner comme une crêpe !',
    `Tu me l'as mise bien profonde, mais je reviendrai plus fort !`,
    `T'es ma pute, je fais ce que je veux de toi !`,
  ),
  'lac-aux-relous': createKing(
    'lac-aux-relous',
    vladimirPutain,
    8,
    'Я люблю хорошие ясли из кулей',
    'Я люблю тебя, хочешь пойти со мной на свидание?',
    'Я засунул свой палец тебе в задницу',
  ),
  'canyon-a-la-derp': createKing(
    'canyon-a-la-derp',
    donaldTrompe,
    8,
    'Ce canyon est le plus grand et le plus beau du monde, tu ne peux pas le nier !',
    'Tu as réussi à traverser le canyon, mais je reviendrai plus fort ! ',
    'Tu es un perdant, tu ne mérites pas de traverser ce canyon !',
  ),
  'cratere-des-legends': createKing(
    'cratere-des-legends',
    donaldTrompe,
    9,
    'Ce cratère est le plus grand et le plus beau du monde, tu ne peux pas le nier !',
    'Tu as réussi à traverser le cratère, mais je reviendrai plus fort ! ',
    'Tu es un perdant, tu ne mérites pas de traverser ce cratère !',
  ),
  'mont-kouillasse': createKing(
    'mont-kouillasse',
    donaldTrompe,
    9,
    'Ce mont est le plus grand et le plus beau du monde, tu ne peux pas le nier !',
    'Tu as réussi à traverser le mont, mais je reviendrai plus fort !',
    'Tu es un perdant, tu ne mérites pas de traverser ce mont !',
  ),
  'paturage-crado': createKing(
    'paturage-crado',
    donaldTrompe,
    9,
    'Ce pâturage est le plus grand et le plus beau du monde, tu ne peux pas le nier !',
    'Tu as réussi à traverser le pâturage, mais je reviendrai plus fort !',
    'Tu es un perdant, tu ne mérites pas de traverser ce pâturage !',
  ),
}
