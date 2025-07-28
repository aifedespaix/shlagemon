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
import mystouffe from './shlagemons/20-25/mystouffe'
import melofoutre from './shlagemons/30-35/melofoutre'
import racaillou from './shlagemons/40-45/racaillou'
import houlard from './shlagemons/60-65/houlard'
import onixtamere from './shlagemons/70-75/onixtamere'
import huithuit from './shlagemons/75-80/huithuit'
import poissaucisse from './shlagemons/85-90/poissaucisse'
import gravaglaire from './shlagemons/evolutions/gravaglaire'
import hyporuisseau from './shlagemons/evolutions/hyporuisseau'
import rafflamby from './shlagemons/evolutions/rafflamby'
import tordturc from './shlagemons/evolutions/tord-turc'
import { zonesData } from './zones'
import goubite from './shlagemons/15-20/goubite'
import vieuxBlaireau from './shlagemons/evolutions/vieuxblaireau'
import chetibranle from './shlagemons/40-45/chetibranle'
import coconnul from './shlagemons/evolutions/coconnul'
import rapasdepisse from './shlagemons/evolutions/rapasdepisse'
import glandignon from './shlagemons/65-70/glandignon'
import orchibre from './shlagemons/evolutions/orchibre'
import barbeBizarre from './shlagemons/evolutions/barbe-bizarre'
import macho from './shlagemons/35-40/macho'
import ferosang from './shlagemons/35-40/ferosang'
import masschopeur from './shlagemons/evolutions/masschopeur'
import taupicouze from './shlagemons/25-30/taupicouze'
import rhinoplastie from './shlagemons/evolutions/rhinoplastie'
import { aliceCordonbleu } from './characters/alice-cordonbleu'
import pyrolise from './shlagemons/evolutions/pyrolise'
import cacanus from './shlagemons/20-25/cacanus'
import ricardnin from './shlagemons/evolutions/ricardnin'
import kraputo from './shlagemons/55-60/kraputo'
import { picassos } from './characters/picassos'
import piafsansbec from './shlagemons/25-30/piafsansbec'
import hericouille from './shlagemons/65-70/hericouille'
import ptitrat from './shlagemons/55-60/ptitrat'
import hosoltueur from './shlagemons/evolutions/hosoltueur'
import coloscopie from './shlagemons/evolutions/coloscopie'
import { moniqueCerisier } from './characters/monique-cerisier'
import heristrash from './shlagemons/evolutions/heristrash'
import amonichiasse from './shlagemons/55-60/amonichiasse'
import grosseflemme from './shlagemons/evolutions/grosseflemme'
import magnubellule from './shlagemons/45-50/magnubellule'
import { labbeBiere } from './characters/labbe-biere'
import dentlait from './shlagemons/75-80/dentlait'
import { jkRalwing } from './characters/jk-ralwing'
import coksale from './shlagemons/60-65/coksale'
import coksnif from './shlagemons/evolutions/coksnif'
import coxymort from './shlagemons/evolutions/coxymort'
import aerobite from './shlagemons/evolutions/aerobite'
import papysucon from './shlagemons/evolutions/papi-sucon'
import nidononbinaireF from './shlagemons/30-35/nidononbinaire-f'
import nidononbinaireM from './shlagemons/30-35/nidononbinaire-m'
import nidoteub from './shlagemons/evolutions/nidoteub'
import nidoschneck from './shlagemons/evolutions/nidoschneck'
import kadavrebras from './shlagemons/evolutions/kadavrebras'
import sperectum from './shlagemons/evolutions/sperectum'
import ectroudbal from './shlagemons/evolutions/ectroudbal'
import fantomanus from './shlagemons/01-05/fantomanus'
import qulbudrogue from './shlagemons/15-20/qulbudrogue'
import smongol from './shlagemons/80-85/smongol'
import { charlesManoir } from './characters/charles-manoir'
import { glandhi } from './characters/glandhi'
import marginal from './shlagemons/50-55/marginal'
import lamantinedu38 from './shlagemons/evolutions/lamantinedu38'
import krabbolosse from './shlagemons/evolutions/krabbolosse'
import grossetarte from './shlagemons/evolutions/grossetarte'
import qwiflash from './shlagemons/65-70/qwiflash'
import qwiflouch from './shlagemons/evolutions/qwiflouch'
import { thaisDescufion } from './characters/thais-descufion'
import metamorve from './shlagemons/05-10/metamorve'
import ratartine from './shlagemons/evolutions/ratartine'
import ratonton from './shlagemons/20-25/ratonton'
import waouff from './shlagemons/25-30/waouff'
import canarchicon from './shlagemons/30-35/canarchicon'
import dosolo from './shlagemons/45-50/dosolo'
import { elizabethHomeless } from './characters/elizabeth-homeless'
import flaclodoss from './shlagemons/evolutions/flaclodoss'
import poissomerguez from './shlagemons/evolutions/poissomerguez'
import carreflex from './shlagemons/60-65/carreflex'
import kandurex from './shlagemons/85-90/kandurex'
import pauvreetcon from './shlagemons/55-60/pauvreetcon'
import grosmitoss from './shlagemons/25-30/grosmitoss'
import { bouba } from './characters/bouba'
import chignon from './shlagemons/75-80/chignon'
import kistlee from './shlagemons/75-80/kistlee'
import drapcon from './shlagemons/evolutions/drapcon'
import minidrapcon from './shlagemons/65-70/minidrapcon'
import drapcoloscopie from './shlagemons/evolutions/drapcoloscopie'
import electrobeauf from './shlagemons/evolutions/electrobeauf'
import voltamere from './shlagemons/70-75/voltamere'
import magnementon from './shlagemons/evolutions/magnementon'
import { elisabethBorgne } from './characters/elisabeth-borgne'
import { etronMuscle } from './characters/etron-muscle'
import rouxPasCool from './shlagemons/01-05/rouxPasCool'
import noctedard from './shlagemons/evolutions/noctedard'
import lecocu from './shlagemons/80-85/lecocu'
import electhordu from './shlagemons/electhordu'
import meladolphe from './shlagemons/evolutions/meladolphe'
import psykonaute from './shlagemons/35-40/psykonaute'
import nosferasta from './shlagemons/evolutions/nosferasta'
import kaputrak from './shlagemons/evolutions/kaputrak'
import raptorincel from './shlagemons/evolutions/raptorincel'
import sulfusouris from './shlagemons/sulfusouris'
import floripute from './shlagemons/evolutions/floripute'
import dracoCon from './shlagemons/evolutions/draco-con'
import raichiotte from './shlagemons/evolutions/raichiotte'

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
      { baseId: racaillou.id, level: 8 },
      { baseId: onixtamere.id, level: 9 },
      { baseId: gravaglaire.id, level: 11 },
    ],
  },
  'chemin-du-slip': {
    id: 'king-chemin-du-slip',
    character: norman,
    dialogBefore: 'Entres dans ma grotte si tu l\'oses.',
    dialogAfter: 'Ta victoire ne sera que temporaire, je retourne en garde à vue.',
    dialogDefeat: 'Tu pues la lose, file te laver !',
    reward: zonesData.find(z => z.id === 'chemin-du-slip')?.maxLevel || 1,
    shlagemons: [
      { baseId: melofoutre.id, level: 14 },
      { baseId: huithuit.id, level: 15 },
      { baseId: taupicouze.id, level: 16 },
    ],
  },
  'ravin-fesse-molle': {
    id: 'king-ravin-fesse-molle',
    character: marineLahaine,
    dialogBefore: 'Yo, j\'suis raciste.',
    dialogAfter: 'Incroyable... tu as gagné. Je vais donc arrêter d\'être raciste. Merci de m\'avoir ouvert les yeux !',
    dialogDefeat: 'Dégage ! Retourne dans ton pays !',
    reward: zonesData.find(z => z.id === 'ravin-fesse-molle')?.maxLevel || 1,
    shlagemons: [
      { baseId: houlard.id, level: 19 },
      { baseId: rafflamby.id, level: 20 },
      { baseId: tordturc.id, level: 21 },
    ],
  },
  'precipice-nanard': {
    id: 'king-precipice-nanard',
    character: marcon,
    dialogBefore: 'Je suis prêt à te mettre une sacrée rouste espèce de cassos ! Je déteste les pauvres comme toi, sale bâtard !',
    dialogAfter: 'Tu m\'as explosé le fiak, je vais te foutre une grosse loi dans ta gueule, ça va te calmer.',
    dialogDefeat: 'T\'es une merde, t\'as toujours été une merde, tu resteras une merde toute ta vie.',
    reward: zonesData.find(z => z.id === 'precipice-nanard')?.maxLevel || 1,
    shlagemons: [
      { baseId: goubite.id, level: 23 },
      { baseId: vieuxBlaireau.id, level: 24 },
      { baseId: chetibranle.id, level: 25 },
      { baseId: coconnul.id, level: 26 },
    ],
  },
  'marais-moudugenou': {
    id: 'king-marais-moudugenou',
    character: siphanus,
    dialogBefore: 'J\'ai des infos sur la sortie de la prochaine Switch !',
    dialogAfter: 'Tu t\'extirpes du marais victorieux, tu ne sauras donc jamais quand la prochaine Switch va sortir...',
    dialogDefeat: 'Je t\'éclabousse de ma boue, retourne barboter ailleurs.',
    reward: zonesData.find(z => z.id === 'marais-moudugenou')?.maxLevel || 1,
    shlagemons: [
      { baseId: orchibre.id, level: 28 },
      { baseId: barbeBizarre.id, level: 39 },
      { baseId: glandignon.id, level: 30 },
      { baseId: rapasdepisse.id, level: 31 },
    ],
  },
  'forteresse-petmoalfiak': {
    id: 'king-forteresse-petmoalfiak',
    character: donaldTrompe,
    dialogBefore: 'Ma forteresse est imprenable, j\'y ai construit un mur titanesque !',
    dialogAfter: 'Tu as brisé ma forteresse... je vais te niquer ton père et construire un mur tout autour !',
    dialogDefeat: 'Boum ! Ma forteresse t\'écrase, petit looser de mort ! J\'te baise !',
    reward: zonesData.find(z => z.id === 'forteresse-petmoalfiak')?.maxLevel || 1,
    shlagemons: [
      { baseId: macho.id, level: 33 },
      { baseId: ferosang.id, level: 34 },
      { baseId: rhinoplastie.id, level: 35 },
      { baseId: masschopeur.id, level: 36 },
    ],
  },
  'route-du-nawak': {
    id: 'king-route-du-nawak',
    character: aliceCordonbleu,
    dialogBefore: "Je n'aime ni la couleur de tes cheveux, ni la forme de ton nez, ni la taille de tes pieds. Prépare toi à perdre tes couilles !",
    dialogAfter: 'Tu t\'en sors, pour l\'instant.',
    dialogDefeat: "Je suis obligée de quitter le territoire, mais je reviendrai pour te bouffer le cul, enculé de ta race !",
    reward: zonesData.find(z => z.id === 'route-du-nawak')?.maxLevel || 1,
    shlagemons: [
      { baseId: pyrolise.id, level: 38 },
      { baseId: cacanus.id, level: 39 },
      { baseId: kraputo.id, level: 40 },
      { baseId: ricardnin.id, level: 41 },
    ],
  },
  'mont-dracatombe': {
    id: 'king-mont-dracatombe',
    character: picassos,
    dialogBefore: "Salut, j'aime beaucoup les couleurs mais également tabasser des meufs.",
    dialogAfter: "Tu as réussi à me vaincre, je te peindrait tout de même en looser.",
    dialogDefeat: "Tu pues la merde, je te nique tes morts !",
    reward: zonesData.find(z => z.id === 'mont-dracatombe')?.maxLevel || 1,
    shlagemons: [
      { baseId: piafsansbec.id, level: 42 },
      { baseId: hericouille.id, level: 43 },
      { baseId: ptitrat.id, level: 44 },
      { baseId: hosoltueur.id, level: 45 },
      { baseId: coloscopie.id, level: 46 },
    ],
  },
  'catacombes-merdifientes': {
    id: 'king-catacombes-merdifientes',
    character: moniqueCerisier,
    dialogBefore: "Peux tu m'aider à descendre ce sac dans ma cave, s'il te plaît ?",
    dialogAfter: 'Je sombre dans l\'ombre des catacombes avec mon terrible secret.',
    dialogDefeat: 'Remonte donc à la surface, larve.',
    reward: zonesData.find(z => z.id === 'catacombes-merdifientes')?.maxLevel || 1,
    shlagemons: [
      { baseId: amonichiasse.id, level: 47 },
      { baseId: dentlait.id, level: 48 },
      { baseId: magnubellule.id, level: 49 },
      { baseId: grosseflemme.id, level: 50 },
      { baseId: heristrash.id, level: 51 },
    ],
  },
  'route-aguicheuse': {
    id: 'king-route-aguicheuse',
    character: labbeBiere,
    dialogBefore: "Moi j'aide les pauvre mais je les baises aussi. Avec ou sans consentement.",
    dialogAfter: "Bien joué, voyageur, tu m'as bien enculé.",
    dialogDefeat: "Et je te baise toi aussi, espèce de trou de balle informe !",
    reward: zonesData.find(z => z.id === 'route-aguicheuse')?.maxLevel || 1,
    shlagemons: [
      { baseId: coksale.id, level: 52 },
      { baseId: aerobite.id, level: 53 },
      { baseId: coksnif.id, level: 54 },
      { baseId: papysucon.id, level: 55 },
      { baseId: coxymort.id, level: 56 },
    ],
  },
  'vallee-des-chieurs': {
    id: 'king-vallee-des-chieurs',
    character: jkRalwing,
    dialogBefore: 'Tu es plutôt un garçon ou une fille ? Décide toi car je ne veux pas perdre mon temps avec les indécis.',
    dialogAfter: "Tu m'as ovuert les yeux, je vais t'accepter comme tu es : un vagin à tête de gland.",
    dialogDefeat: "Je t'ai violenté aussi fort qu'un expéliermus, tu es un vrai loser.",
    reward: zonesData.find(z => z.id === 'vallee-des-chieurs')?.maxLevel || 1,
    shlagemons: [
      { baseId: nidononbinaireF.id, level: 57 },
      { baseId: nidononbinaireM.id, level: 58 },
      { baseId: nidoteub.id, level: 59 },
      { baseId: nidoschneck.id, level: 60 },
      { baseId: kadavrebras.id, level: 61 },
    ],
  },
  'trou-du-bide': {
    id: 'king-trou-du-bide',
    character: charlesManoir,
    dialogBefore: 'Helllo !  Veux tu goutter à ma nouvelle beuh ?',
    dialogAfter: "Je vais te faire subir ma colère, personne ne me manque de respect !",
    dialogDefeat: "Viens avec moi, je t'accompagne mon Loulou...",
    reward: zonesData.find(z => z.id === 'trou-du-bide')?.maxLevel || 1,
    shlagemons: [
      { baseId: fantomanus.id, level: 62 },
      { baseId: qulbudrogue.id, level: 63 },
      { baseId: sperectum.id, level: 64 },
      { baseId: smongol.id, level: 65 },
      { baseId: ectroudbal.id, level: 66 },
    ],
  },
  'zone-giga-zob': {
    id: 'king-zone-giga-zob',
    character: glandhi,
    dialogBefore: "Je suis paix, je suis amour, tu n'as qu'à m'écouter et tu seras sauvé !",
    dialogAfter: 'Je te hais, toi et tes idées de merde !',
    dialogDefeat: 'Je suis ta haine, je suis ta colère, je suis ton désespoir !',
    reward: zonesData.find(z => z.id === 'zone-giga-zob')?.maxLevel || 1,
    shlagemons: [
      { baseId: marginal.id, level: 67 },
      { baseId: marginal.id, level: 68 },
      { baseId: marginal.id, level: 69 },
      { baseId: marginal.id, level: 70 },
      { baseId: marginal.id, level: 71 },
    ],
  },
  'route-so-dom': {
    id: 'king-route-so-dom',
    character: thaisDescufion,
    dialogBefore: "Les meufs, c'est toutes des putes, alors que moi j'adoooorrrreee faire la vaiselle !",
    dialogAfter: `Tu me l'as mise bien profonde, mais je reviendrai plus forte !`,
    dialogDefeat: `T'es ma pute, je fais ce que je veux de toi !`,
    reward: zonesData.find(z => z.id === 'route-so-dom')?.maxLevel || 1,
    shlagemons: [
      { baseId: krabbolosse.id, level: 72 },
      { baseId: grossetarte.id, level: 73 },
      { baseId: qwiflash.id, level: 74 },
      { baseId: qwiflouch.id, level: 75 },
      { baseId: lamantinedu38.id, level: 76 },
    ],
  },
  'lac-aux-relous': {
    id: 'king-lac-aux-relous',
    character: vladimirPutain,
    dialogBefore: 'Я люблю хорошие ясли из кулей',
    dialogAfter: 'Я люблю тебя, хочешь pойти со мной на свидание?',
    dialogDefeat: 'Я засунул свой палец тебе в задницу',
    reward: zonesData.find(z => z.id === 'lac-aux-relous')?.maxLevel || 1,
    shlagemons: [
      { baseId: metamorve.id, level: 76 },
      { baseId: ratonton.id, level: 77 },
      { baseId: ratartine.id, level: 78 },
      { baseId: waouff.id, level: 79 },
      { baseId: canarchicon.id, level: 80 },
      { baseId: dosolo.id, level: 81 },
    ],
  },
  'canyon-a-la-derp': {
    id: 'king-canyon-a-la-derp',
    character: elizabethHomeless,
    dialogBefore: "Bienvenue au Canyon-a-la-derp™, le seul endroit où une simple goutte de sueur suffit à prouver ta grandeur... enfin, en théorie.",
    dialogAfter: "Incroyable, tu as survécu à ma technologie révolutionnaire 100% inefficace. Tu mériterais presque un brevet.",
    dialogDefeat: "Échec critique détecté. Mais t’inquiète, avec un bon PowerPoint, tu pourrais faire croire que t'as gagné.",
  reward: zonesData.find(z => z.id === 'canyon-a-la-derp')?.maxLevel || 1,
    shlagemons: [
      { baseId: pauvreetcon.id, level: 81 },
      { baseId: kandurex.id, level: 82 },
      { baseId: carreflex.id, level: 83 },
      { baseId: poissomerguez.id, level: 84 },
      { baseId: grosmitoss.id, level: 85 },
      { baseId: flaclodoss.id, level: 86 },
    ],
  },
  'cratere-des-legends': {
    id: 'king-cratere-des-legends',
    character: bouba,
    dialogBefore: 'Wesh fdp.',
    dialogAfter: 'Je vais retourner a Los Angeles, et je serai beaucoup plus fort enculé !',
    dialogDefeat: 'Tu es un perdant, tu ne mérites pas de traverser ce cratère ! Baise ton frère.',
    reward: zonesData.find(z => z.id === 'cratere-des-legends')?.maxLevel || 1,
    shlagemons: [
      { baseId: minidrapcon.id, level: 86 },
      { baseId: voltamere.id, level: 87 },
      { baseId: magnementon.id, level: 88 },
      { baseId: drapcon.id, level: 89 },
      { baseId: electrobeauf.id, level: 90 },
      { baseId: drapcoloscopie.id, level: 91 },
    ],
  },
  'mont-kouillasse': {
    id: 'king-mont-kouillasse',
    character: etronMuscle,
    dialogBefore: "Bonjour, en tant que Roi du Mont Kouillasse, j'ai une liberté d'expression TOTALE ! Je peux dire ce que je veux et sucer des petits moustachus Allemands sans aucune censure !",
    dialogAfter: "Vas te faire foutre, je t'enverrai dans une fusée pour que t'ailles sucer des couilles sur Mars !",
    dialogDefeat: "T'es aussi con que ta mère, tu ne mérites pas de traverser le Mont Kouillasse !",
    reward: zonesData.find(z => z.id === 'mont-kouillasse')?.maxLevel || 1,
    shlagemons: [
      { baseId: lecocu.id, level: 91 },
      { baseId: meladolphe.id, level: 92 },
      { baseId: psykonaute.id, level: 93 },
      { baseId: nosferasta.id, level: 94 },
      { baseId: rapasdepisse.id, level: 95 },
      { baseId: electhordu.id, level: 96 },
    ],
  },
  'paturage-crado': {
    id: 'king-paturage-crado',
    character: elisabethBorgne,
    dialogBefore: 'Je vais te faire bouffer ton petit cul !',
    dialogAfter: 'Alors là bravo, tu as réussi à me battre. Je vais aller me faire un petit café pour me remettre de cette défaite.',
    dialogDefeat: 'Je vais imposer une loi pour interdire les losers comme toi de se balader dans les pâturages !',
    reward: zonesData.find(z => z.id === 'paturage-crado')?.maxLevel || 1,
    shlagemons: [
      { baseId: floripute.id, level: 99 },
      { baseId: dracoCon.id, level: 99 },
      { baseId: tordturc.id, level: 99 },
      { baseId: raichiotte.id, level: 99 },
      { baseId: kaputrak.id, level: 99 },
      { baseId: sulfusouris.id, level: 99 },
    ],
  },
}
