import type { Character } from '~/type/character'
import type { SavageZoneId } from '~/type/zone'
import type { BaseShlagemon, Trainer } from '~/types'
import { aliceCordonbleu } from './characters/alice-cordonbleu'
import { bouba } from './characters/bouba'
import { caillou } from './characters/caillou'
import { charlesManoir } from './characters/charles-manoir'
import { donaldTrompe } from './characters/donald-trompe'
import { elisabethBorgne } from './characters/elisabeth-borgne'
import { elizabethHomeless } from './characters/elizabeth-homeless'
import { etronMuscle } from './characters/etron-muscle'
import { glandhi } from './characters/glandhi'
import { jkRalwing } from './characters/jk-ralwing'
import { labbeBiere } from './characters/labbe-biere'
import { marcon } from './characters/marcon'
import { marineLahaine } from './characters/marine-lahaine'
import { moniqueCerisier } from './characters/monique-cerisier'
import { norman } from './characters/norman'
import { ondejeune } from './characters/ondejeune'
import { picassos } from './characters/picassos'
import { siphanus } from './characters/siphanus'
import { thaisDescufion } from './characters/thais-descufion'
import { vladimirPutain } from './characters/vladimir-putain'
import fantomanus from './shlagemons/01-05/fantomanus'
import metamorve from './shlagemons/05-10/metamorve'
import goubite from './shlagemons/15-20/goubite'
import qulbudrogue from './shlagemons/15-20/qulbudrogue'
import cacanus from './shlagemons/20-25/cacanus'
import ratonton from './shlagemons/20-25/ratonton'
import grosmitoss from './shlagemons/25-30/grosmitoss'
import piafsansbec from './shlagemons/25-30/piafsansbec'
import taupicouze from './shlagemons/25-30/taupicouze'
import waouff from './shlagemons/25-30/waouff'
import canarchicon from './shlagemons/30-35/canarchicon'
import melofoutre from './shlagemons/30-35/melofoutre'
import nidononbinaireF from './shlagemons/30-35/nidononbinaire-f'
import nidononbinaireM from './shlagemons/30-35/nidononbinaire-m'
import ferosang from './shlagemons/35-40/ferosang'
import macho from './shlagemons/35-40/macho'
import psykonaute from './shlagemons/35-40/psykonaute'
import chetibranle from './shlagemons/40-45/chetibranle'
import racaillou from './shlagemons/40-45/racaillou'
import dosolo from './shlagemons/45-50/dosolo'
import magnubellule from './shlagemons/45-50/magnubellule'
import marginal from './shlagemons/50-55/marginal'
import amonichiasse from './shlagemons/55-60/amonichiasse'
import kraputo from './shlagemons/55-60/kraputo'
import pauvreetcon from './shlagemons/55-60/pauvreetcon'
import ptitrat from './shlagemons/55-60/ptitrat'
import carreflex from './shlagemons/60-65/carreflex'
import coksale from './shlagemons/60-65/coksale'
import houlard from './shlagemons/60-65/houlard'
import glandignon from './shlagemons/65-70/glandignon'
import hericouille from './shlagemons/65-70/hericouille'
import minidrapcon from './shlagemons/65-70/minidrapcon'
import qwiflash from './shlagemons/65-70/qwiflash'
import onixtamere from './shlagemons/70-75/onixtamere'
import voltamere from './shlagemons/70-75/voltamere'
import dentlait from './shlagemons/75-80/dentlait'
import huithuit from './shlagemons/75-80/huithuit'
import lecocu from './shlagemons/80-85/lecocu'
import smongol from './shlagemons/80-85/smongol'
import kandurex from './shlagemons/85-90/kandurex'
import poissaucisse from './shlagemons/85-90/poissaucisse'
import electhordu from './shlagemons/electhordu'
import aerobite from './shlagemons/evolutions/aerobite'
import barbeBizarre from './shlagemons/evolutions/barbe-bizarre'
import coconnul from './shlagemons/evolutions/coconnul'
import coksnif from './shlagemons/evolutions/coksnif'
import coloscopie from './shlagemons/evolutions/coloscopie'
import coxymort from './shlagemons/evolutions/coxymort'
import dracoCon from './shlagemons/evolutions/draco-con'
import drapcoloscopie from './shlagemons/evolutions/drapcoloscopie'
import drapcon from './shlagemons/evolutions/drapcon'
import ectroudbal from './shlagemons/evolutions/ectroudbal'
import electrobeauf from './shlagemons/evolutions/electrobeauf'
import flaclodoss from './shlagemons/evolutions/flaclodoss'
import floripute from './shlagemons/evolutions/floripute'
import gravaglaire from './shlagemons/evolutions/gravaglaire'
import grosseflemme from './shlagemons/evolutions/grosseflemme'
import grossetarte from './shlagemons/evolutions/grossetarte'
import heristrash from './shlagemons/evolutions/heristrash'
import hosoltueur from './shlagemons/evolutions/hosoltueur'
import hyporuisseau from './shlagemons/evolutions/hyporuisseau'
import kadavrebras from './shlagemons/evolutions/kadavrebras'
import kaputrak from './shlagemons/evolutions/kaputrak'
import krabbolosse from './shlagemons/evolutions/krabbolosse'
import lamantinedu38 from './shlagemons/evolutions/lamantinedu38'
import magnementon from './shlagemons/evolutions/magnementon'
import masschopeur from './shlagemons/evolutions/masschopeur'
import meladolphe from './shlagemons/evolutions/meladolphe'
import nidoschneck from './shlagemons/evolutions/nidoschneck'
import nidoteub from './shlagemons/evolutions/nidoteub'
import nosferasta from './shlagemons/evolutions/nosferasta'
import orchibre from './shlagemons/evolutions/orchibre'
import papysucon from './shlagemons/evolutions/papi-sucon'
import poissomerguez from './shlagemons/evolutions/poissomerguez'
import pyrolise from './shlagemons/evolutions/pyrolise'
import qwiflouch from './shlagemons/evolutions/qwiflouch'
import rafflamby from './shlagemons/evolutions/rafflamby'
import raichiotte from './shlagemons/evolutions/raichiotte'
import rapasdepisse from './shlagemons/evolutions/rapasdepisse'
import ratartine from './shlagemons/evolutions/ratartine'
import rhinoplastie from './shlagemons/evolutions/rhinoplastie'
import ricardnin from './shlagemons/evolutions/ricardnin'
import sperectum from './shlagemons/evolutions/sperectum'
import tordturc from './shlagemons/evolutions/tord-turc'
import vieuxBlaireau from './shlagemons/evolutions/vieuxblaireau'
import sulfusouris from './shlagemons/sulfusouris'
import { zonesData } from './zones'

function _createKing(
  zoneId: SavageZoneId,
  character: Character,
  qteShlagemons: number,
  dialogBefore: string,
  dialogBeforeKey: string,
  dialogAfter: string,
  dialogAfterKey: string,
  dialogDefeat: string,
  dialogDefeatKey: string,
): Trainer {
  const zone = zonesData.find(z => z.id === zoneId)
  if (!zone) {
    throw new Error(`Zone ${zoneId} not found`)
  }
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

  const shlagemons: string[] = selected.map(b => b.id)

  return {
    id: `king-${zoneId}`,
    character,
    dialogBefore,
    dialogBeforeKey,
    dialogAfter,
    dialogAfterKey,
    dialogDefeat,
    dialogDefeatKey,
    reward: zone.maxLevel || 1,
    shlagemons,
  }
}

type Kings = Record<SavageZoneId, Trainer>

function _createStaticShlags(_zoneId: SavageZoneId) {
  return Array.from({ length: 4 }, () => 'wem')
}

export const kings: Kings = {
  'plaine-kekette': {
    id: 'king-plaine-kekette',
    character: ondejeune,
    reward: zonesData.find(z => z.id === 'plaine-kekette')?.maxLevel || 1,
    dialogBefore: 'Coucou, si tu gagnes, je te paye le petit déjeuné !',
    dialogBeforeKey: 'data.kings.plaine-kekette.dialogBefore',
    dialogAfter: 'Ok, ok, tu as gagné, je vais t\'inviter pour ce petit déj !',
    dialogAfterKey: 'data.kings.plaine-kekette.dialogAfter',
    dialogDefeat: 'Mais quel grosse merde, tu vas me payer un petit déj\' de ouf !',
    dialogDefeatKey: 'data.kings.plaine-kekette.dialogDefeat',
    shlagemons: [
      poissaucisse.id,
      hyporuisseau.id,
    ],
  },
  'bois-de-bouffon': {
    id: 'king-bois-de-bouffon',
    character: caillou,
    dialogBefore: 'Ici, c\'est ma street, et tu as trop de cheveux pour pouvoir continuer ton chemin.',
    dialogBeforeKey: 'data.kings.bois-de-bouffon.dialogBefore',
    dialogAfter: 'Tu m\'as bien déglingué, bravo ! Je vais aller me faire un shampoing et je reviendrai bien plus fort !',
    dialogAfterKey: 'data.kings.bois-de-bouffon.dialogAfter',
    dialogDefeat: 'Je vais te faire bouffer tes cheveux espèce de sous merde !',
    dialogDefeatKey: 'data.kings.bois-de-bouffon.dialogDefeat',
    reward: zonesData.find(z => z.id === 'bois-de-bouffon')?.maxLevel || 1,
    shlagemons: [
      racaillou.id,
      onixtamere.id,
      gravaglaire.id,
    ],
  },
  'chemin-du-slip': {
    id: 'king-chemin-du-slip',
    character: norman,
    dialogBefore: 'Entres dans ma grotte si tu l\'oses.',
    dialogBeforeKey: 'data.kings.chemin-du-slip.dialogBefore',
    dialogAfter: 'Ta victoire ne sera que temporaire, je retourne en garde à vue.',
    dialogAfterKey: 'data.kings.chemin-du-slip.dialogAfter',
    dialogDefeat: 'Tu pues la lose, file te laver !',
    dialogDefeatKey: 'data.kings.chemin-du-slip.dialogDefeat',
    reward: zonesData.find(z => z.id === 'chemin-du-slip')?.maxLevel || 1,
    shlagemons: [
      melofoutre.id,
      huithuit.id,
      taupicouze.id,
    ],
  },
  'ravin-fesse-molle': {
    id: 'king-ravin-fesse-molle',
    character: marineLahaine,
    dialogBefore: 'Yo, j\'suis raciste.',
    dialogBeforeKey: 'data.kings.ravin-fesse-molle.dialogBefore',
    dialogAfter: 'Incroyable... tu as gagné. Je vais donc arrêter d\'être raciste. Merci de m\'avoir ouvert les yeux !',
    dialogAfterKey: 'data.kings.ravin-fesse-molle.dialogAfter',
    dialogDefeat: 'Dégage ! Retourne dans ton pays !',
    dialogDefeatKey: 'data.kings.ravin-fesse-molle.dialogDefeat',
    reward: zonesData.find(z => z.id === 'ravin-fesse-molle')?.maxLevel || 1,
    shlagemons: [
      houlard.id,
      rafflamby.id,
      tordturc.id,
    ],
  },
  'precipice-nanard': {
    id: 'king-precipice-nanard',
    character: marcon,
    dialogBefore: 'Je suis prêt à te mettre une sacrée rouste espèce de cassos ! Je déteste les pauvres comme toi, sale bâtard !',
    dialogBeforeKey: 'data.kings.precipice-nanard.dialogBefore',
    dialogAfter: 'Tu m\'as explosé le fiak, je vais te foutre une grosse loi dans ta gueule, ça va te calmer.',
    dialogAfterKey: 'data.kings.precipice-nanard.dialogAfter',
    dialogDefeat: 'T\'es une merde, t\'as toujours été une merde, tu resteras une merde toute ta vie.',
    dialogDefeatKey: 'data.kings.precipice-nanard.dialogDefeat',
    reward: zonesData.find(z => z.id === 'precipice-nanard')?.maxLevel || 1,
    shlagemons: [
      goubite.id,
      vieuxBlaireau.id,
      chetibranle.id,
      coconnul.id,
    ],
  },
  'marais-moudugenou': {
    id: 'king-marais-moudugenou',
    character: siphanus,
    dialogBefore: 'J\'ai des infos sur la sortie de la prochaine Switch !',
    dialogBeforeKey: 'data.kings.marais-moudugenou.dialogBefore',
    dialogAfter: 'Tu t\'extirpes du marais victorieux, tu ne sauras donc jamais quand la prochaine Switch va sortir...',
    dialogAfterKey: 'data.kings.marais-moudugenou.dialogAfter',
    dialogDefeat: 'Je t\'éclabousse de ma boue, retourne barboter ailleurs.',
    dialogDefeatKey: 'data.kings.marais-moudugenou.dialogDefeat',
    reward: zonesData.find(z => z.id === 'marais-moudugenou')?.maxLevel || 1,
    shlagemons: [
      orchibre.id,
      barbeBizarre.id,
      glandignon.id,
      rapasdepisse.id,
    ],
  },
  'forteresse-petmoalfiak': {
    id: 'king-forteresse-petmoalfiak',
    reward: zonesData.find(z => z.id === 'forteresse-petmoalfiak')?.maxLevel || 1,
    character: charlesManoir,
    dialogBefore: 'Tu entends cette petite voix dans ta tête ? Elle te dit de perdre... C’est moi. Bienvenue dans mon trip, tu ne t’en sortiras pas indemne !',
    dialogBeforeKey: 'data.kings.forteresse-petmoalfiak.dialogBefore',
    dialogAfter: 'Quoi ?! Même mes discours tordus ne t’ont pas fait perdre pied ? Tu dois être vraiment perché, toi aussi…',
    dialogAfterKey: 'data.kings.forteresse-petmoalfiak.dialogAfter',
    dialogDefeat: 'Wow… tu pues la loose ! Attention, les vraies hallucinations commencent à la prochaine pleine lune…',
    dialogDefeatKey: 'data.kings.forteresse-petmoalfiak.dialogDefeat',
    shlagemons: [
      macho.id,
      ferosang.id,
      rhinoplastie.id,
      masschopeur.id,
    ],
  },
  'route-du-nawak': {
    id: 'king-route-du-nawak',
    character: aliceCordonbleu,
    dialogBefore: 'Je n\'aime ni la couleur de tes cheveux, ni la forme de ton nez, ni la taille de tes pieds. Prépare toi à perdre tes couilles !',
    dialogBeforeKey: 'data.kings.route-du-nawak.dialogBefore',
    dialogAfter: 'Tu t\'en sors, pour l\'instant.',
    dialogAfterKey: 'data.kings.route-du-nawak.dialogAfter',
    dialogDefeat: 'Je suis obligée de quitter le territoire, mais je reviendrai pour te bouffer le cul, enculé de ta race !',
    dialogDefeatKey: 'data.kings.route-du-nawak.dialogDefeat',
    reward: zonesData.find(z => z.id === 'route-du-nawak')?.maxLevel || 1,
    shlagemons: [
      pyrolise.id,
      cacanus.id,
      kraputo.id,
      ricardnin.id,
    ],
  },
  'mont-dracatombe': {
    id: 'king-mont-dracatombe',
    character: picassos,
    dialogBefore: 'Salut, j\'aime beaucoup les couleurs mais également tabasser des meufs.',
    dialogBeforeKey: 'data.kings.mont-dracatombe.dialogBefore',
    dialogAfter: 'Tu as réussi à me vaincre, je te peindrait tout de même en looser.',
    dialogAfterKey: 'data.kings.mont-dracatombe.dialogAfter',
    dialogDefeat: 'Tu pues la merde, je te nique tes morts !',
    dialogDefeatKey: 'data.kings.mont-dracatombe.dialogDefeat',
    reward: zonesData.find(z => z.id === 'mont-dracatombe')?.maxLevel || 1,
    shlagemons: [
      piafsansbec.id,
      hericouille.id,
      ptitrat.id,
      hosoltueur.id,
      coloscopie.id,
    ],
  },
  'catacombes-merdifientes': {
    id: 'king-catacombes-merdifientes',
    character: moniqueCerisier,
    dialogBefore: 'Peux tu m\'aider à descendre ce sac dans ma cave, s\'il te plaît ?',
    dialogBeforeKey: 'data.kings.catacombes-merdifientes.dialogBefore',
    dialogAfter: 'Je sombre dans l\'ombre des catacombes avec mon terrible secret.',
    dialogAfterKey: 'data.kings.catacombes-merdifientes.dialogAfter',
    dialogDefeat: 'Remonte donc à la surface, larve.',
    dialogDefeatKey: 'data.kings.catacombes-merdifientes.dialogDefeat',
    reward: zonesData.find(z => z.id === 'catacombes-merdifientes')?.maxLevel || 1,
    shlagemons: [
      amonichiasse.id,
      dentlait.id,
      magnubellule.id,
      grosseflemme.id,
      heristrash.id,
    ],
  },
  'route-aguicheuse': {
    id: 'king-route-aguicheuse',
    character: labbeBiere,
    dialogBefore: 'Moi j\'aide les pauvre mais je les baises aussi. Avec ou sans consentement.',
    dialogBeforeKey: 'data.kings.route-aguicheuse.dialogBefore',
    dialogAfter: 'Bien joué, voyageur, tu m\'as bien enculé.',
    dialogAfterKey: 'data.kings.route-aguicheuse.dialogAfter',
    dialogDefeat: 'Et je te baise toi aussi, espèce de trou de balle informe !',
    dialogDefeatKey: 'data.kings.route-aguicheuse.dialogDefeat',
    reward: zonesData.find(z => z.id === 'route-aguicheuse')?.maxLevel || 1,
    shlagemons: [
      coksale.id,
      aerobite.id,
      coksnif.id,
      papysucon.id,
      coxymort.id,
    ],
  },
  'vallee-des-chieurs': {
    id: 'king-vallee-des-chieurs',
    character: jkRalwing,
    dialogBefore: 'Tu es plutôt un garçon ou une fille ? Décide toi car je ne veux pas perdre mon temps avec les indécis.',
    dialogBeforeKey: 'data.kings.vallee-des-chieurs.dialogBefore',
    dialogAfter: 'Tu m\'as ovuert les yeux, je vais t\'accepter comme tu es : un vagin à tête de gland.',
    dialogAfterKey: 'data.kings.vallee-des-chieurs.dialogAfter',
    dialogDefeat: 'Je t\'ai violenté aussi fort qu\'un expéliermus, tu es un vrai loser.',
    dialogDefeatKey: 'data.kings.vallee-des-chieurs.dialogDefeat',
    reward: zonesData.find(z => z.id === 'vallee-des-chieurs')?.maxLevel || 1,
    shlagemons: [
      nidononbinaireF.id,
      nidononbinaireM.id,
      nidoteub.id,
      nidoschneck.id,
      kadavrebras.id,
    ],
  },
  'trou-du-bide': {
    id: 'king-trou-du-bide',
    character: donaldTrompe,
    dialogBefore: 'Bienvenue dans mon trou, il est imprenable, j\'y ai construit un mur titanesque !',
    dialogBeforeKey: 'data.kings.trou-du-bide.dialogBefore',
    dialogAfter: 'Tu as brisé mon trou... je vais te niquer ton père et construire un mur tout autour !',
    dialogAfterKey: 'data.kings.trou-du-bide.dialogAfter',
    dialogDefeat: 'Boum ! Mon trou t\'écrase, petit looser de mort ! J\'te baise !',
    dialogDefeatKey: 'data.kings.trou-du-bide.dialogDefeat',
    reward: zonesData.find(z => z.id === 'trou-du-bide')?.maxLevel || 1,
    shlagemons: [
      fantomanus.id,
      qulbudrogue.id,
      sperectum.id,
      smongol.id,
      ectroudbal.id,
    ],
  },
  'zone-giga-zob': {
    id: 'king-zone-giga-zob',
    character: glandhi,
    dialogBefore: 'Je suis paix, je suis amour, tu n\'as qu\'à m\'écouter et tu seras sauvé !',
    dialogBeforeKey: 'data.kings.zone-giga-zob.dialogBefore',
    dialogAfter: 'Je te hais, toi et tes idées de merde !',
    dialogAfterKey: 'data.kings.zone-giga-zob.dialogAfter',
    dialogDefeat: 'Je suis ta haine, je suis ta colère, je suis ton désespoir !',
    dialogDefeatKey: 'data.kings.zone-giga-zob.dialogDefeat',
    reward: zonesData.find(z => z.id === 'zone-giga-zob')?.maxLevel || 1,
    shlagemons: [
      marginal.id,
      marginal.id,
      marginal.id,
      marginal.id,
      marginal.id,
    ],
  },
  'route-so-dom': {
    id: 'king-route-so-dom',
    character: thaisDescufion,
    dialogBefore: 'Les meufs, c\'est toutes des putes, alors que moi j\'adoooorrrreee faire la vaiselle !',
    dialogBeforeKey: 'data.kings.route-so-dom.dialogBefore',
    dialogAfter: `Tu me l'as mise bien profonde, mais je reviendrai plus forte !`,
    dialogAfterKey: 'data.kings.route-so-dom.dialogAfter',
    dialogDefeat: `T'es ma pute, je fais ce que je veux de toi !`,
    dialogDefeatKey: 'data.kings.route-so-dom.dialogDefeat',
    reward: zonesData.find(z => z.id === 'route-so-dom')?.maxLevel || 1,
    shlagemons: [
      krabbolosse.id,
      grossetarte.id,
      qwiflash.id,
      qwiflouch.id,
      lamantinedu38.id,
    ],
  },
  'lac-aux-relous': {
    id: 'king-lac-aux-relous',
    character: vladimirPutain,
    dialogBefore: 'Я люблю хорошие ясли из кулей',
    dialogBeforeKey: 'data.kings.lac-aux-relous.dialogBefore',
    dialogAfter: 'Я люблю тебя, хочешь pойти со мной на свидание?',
    dialogAfterKey: 'data.kings.lac-aux-relous.dialogAfter',
    dialogDefeat: 'Я засунул свой палец тебе в задницу',
    dialogDefeatKey: 'data.kings.lac-aux-relous.dialogDefeat',
    reward: zonesData.find(z => z.id === 'lac-aux-relous')?.maxLevel || 1,
    shlagemons: [
      metamorve.id,
      ratonton.id,
      ratartine.id,
      waouff.id,
      canarchicon.id,
      dosolo.id,
    ],
  },
  'canyon-a-la-derp': {
    id: 'king-canyon-a-la-derp',
    character: elizabethHomeless,
    dialogBefore: 'Bienvenue au Canyon-a-la-derp™, le seul endroit où une simple goutte de sueur suffit à prouver ta grandeur... enfin, en théorie.',
    dialogBeforeKey: 'data.kings.canyon-a-la-derp.dialogBefore',
    dialogAfter: 'Incroyable, tu as survécu à ma technologie révolutionnaire 100% inefficace. Tu mériterais presque un brevet.',
    dialogAfterKey: 'data.kings.canyon-a-la-derp.dialogAfter',
    dialogDefeat: 'Échec critique détecté. Mais t’inquiète, avec un bon PowerPoint, tu pourrais faire croire que t\'as gagné.',
    dialogDefeatKey: 'data.kings.canyon-a-la-derp.dialogDefeat',
    reward: zonesData.find(z => z.id === 'canyon-a-la-derp')?.maxLevel || 1,
    shlagemons: [
      pauvreetcon.id,
      kandurex.id,
      carreflex.id,
      poissomerguez.id,
      grosmitoss.id,
      flaclodoss.id,
    ],
  },
  'cratere-des-legends': {
    id: 'king-cratere-des-legends',
    character: bouba,
    dialogBefore: 'Wesh fdp.',
    dialogBeforeKey: 'data.kings.cratere-des-legends.dialogBefore',
    dialogAfter: 'Je vais retourner a Los Angeles, et je serai beaucoup plus fort enculé !',
    dialogAfterKey: 'data.kings.cratere-des-legends.dialogAfter',
    dialogDefeat: 'Tu es un perdant, tu ne mérites pas de traverser ce cratère ! Baise ton frère.',
    dialogDefeatKey: 'data.kings.cratere-des-legends.dialogDefeat',
    reward: zonesData.find(z => z.id === 'cratere-des-legends')?.maxLevel || 1,
    shlagemons: [
      minidrapcon.id,
      voltamere.id,
      magnementon.id,
      drapcon.id,
      electrobeauf.id,
      drapcoloscopie.id,
    ],
  },
  'mont-kouillasse': {
    id: 'king-mont-kouillasse',
    character: etronMuscle,
    dialogBefore: 'Bonjour, en tant que Roi du Mont Kouillasse, j\'ai une liberté d\'expression TOTALE ! Je peux dire ce que je veux et sucer des petits moustachus Allemands sans aucune censure !',
    dialogBeforeKey: 'data.kings.mont-kouillasse.dialogBefore',
    dialogAfter: 'Vas te faire foutre, je t\'enverrai dans une fusée pour que t\'ailles sucer des couilles sur Mars !',
    dialogAfterKey: 'data.kings.mont-kouillasse.dialogAfter',
    dialogDefeat: 'T\'es aussi con que ta mère, tu ne mérites pas de traverser le Mont Kouillasse !',
    dialogDefeatKey: 'data.kings.mont-kouillasse.dialogDefeat',
    reward: zonesData.find(z => z.id === 'mont-kouillasse')?.maxLevel || 1,
    shlagemons: [
      lecocu.id,
      meladolphe.id,
      psykonaute.id,
      nosferasta.id,
      rapasdepisse.id,
      electhordu.id,
    ],
  },
  'paturage-crado': {
    id: 'king-paturage-crado',
    character: elisabethBorgne,
    dialogBefore: 'Je vais te faire bouffer ton petit cul !',
    dialogBeforeKey: 'data.kings.paturage-crado.dialogBefore',
    dialogAfter: 'Alors là bravo, tu as réussi à me battre. Je vais aller me faire un petit café pour me remettre de cette défaite.',
    dialogAfterKey: 'data.kings.paturage-crado.dialogAfter',
    dialogDefeat: 'Je vais imposer une loi pour interdire les losers comme toi de se balader dans les pâturages !',
    dialogDefeatKey: 'data.kings.paturage-crado.dialogDefeat',
    reward: zonesData.find(z => z.id === 'paturage-crado')?.maxLevel || 1,
    shlagemons: [
      floripute.id,
      dracoCon.id,
      tordturc.id,
      raichiotte.id,
      kaputrak.id,
      sulfusouris.id,
    ],
  },
}
