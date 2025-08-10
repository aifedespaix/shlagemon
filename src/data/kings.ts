import type { Character } from '~/type/character'
import type { SavageZoneId } from '~/type/zone'
import type { BaseShlagemon, I18nKey, Trainer } from '~/types'
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

/**
 * Return the maximum level allowed in the specified savage zone.
 * Falls back to `1` when the zone is not found or not savage.
 */
function getZoneMaxLevel(zoneId: SavageZoneId): number {
  const zone = zonesData.find(z => z.id === zoneId)
  return zone && zone.type === 'sauvage' ? zone.maxLevel : 1
}

function _createKing(
  zoneId: SavageZoneId,
  character: Character,
  qteShlagemons: number,
  dialogBefore: I18nKey,
  dialogAfter: I18nKey,
  dialogDefeat: I18nKey,
): Trainer {
  const zone = zonesData.find(z => z.id === zoneId)
  if (!zone || zone.type !== 'sauvage')
    throw new Error(`Zone ${zoneId} not found`)

  // Gather base shlagemons and their first evolution stage
  const available = (zone.shlagemons ?? [])
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
    dialogAfter,
    dialogDefeat,
    reward: zone.maxLevel,
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
    reward: getZoneMaxLevel('plaine-kekette'),
    dialogBefore: 'data.kings.plaine-kekette.dialogBefore',
    dialogAfter: 'data.kings.plaine-kekette.dialogAfter',
    dialogDefeat: 'data.kings.plaine-kekette.dialogDefeat',
    shlagemons: [
      poissaucisse.id,
      hyporuisseau.id,
    ],
  },
  'bois-de-bouffon': {
    id: 'king-bois-de-bouffon',
    character: caillou,
    dialogBefore: 'data.kings.bois-de-bouffon.dialogBefore',
    dialogAfter: 'data.kings.bois-de-bouffon.dialogAfter',
    dialogDefeat: 'data.kings.bois-de-bouffon.dialogDefeat',
    reward: getZoneMaxLevel('bois-de-bouffon'),
    shlagemons: [
      racaillou.id,
      onixtamere.id,
      gravaglaire.id,
    ],
  },
  'chemin-du-slip': {
    id: 'king-chemin-du-slip',
    character: norman,
    dialogBefore: 'data.kings.chemin-du-slip.dialogBefore',
    dialogAfter: 'data.kings.chemin-du-slip.dialogAfter',
    dialogDefeat: 'data.kings.chemin-du-slip.dialogDefeat',
    reward: getZoneMaxLevel('chemin-du-slip'),
    shlagemons: [
      melofoutre.id,
      huithuit.id,
      taupicouze.id,
    ],
  },
  'ravin-fesse-molle': {
    id: 'king-ravin-fesse-molle',
    character: marineLahaine,
    dialogBefore: 'data.kings.ravin-fesse-molle.dialogBefore',
    dialogAfter: 'data.kings.ravin-fesse-molle.dialogAfter',
    dialogDefeat: 'data.kings.ravin-fesse-molle.dialogDefeat',
    reward: getZoneMaxLevel('ravin-fesse-molle'),
    shlagemons: [
      houlard.id,
      rafflamby.id,
      tordturc.id,
    ],
  },
  'precipice-nanard': {
    id: 'king-precipice-nanard',
    character: marcon,
    dialogBefore: 'data.kings.precipice-nanard.dialogBefore',
    dialogAfter: 'data.kings.precipice-nanard.dialogAfter',
    dialogDefeat: 'data.kings.precipice-nanard.dialogDefeat',
    reward: getZoneMaxLevel('precipice-nanard'),
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
    dialogBefore: 'data.kings.marais-moudugenou.dialogBefore',
    dialogAfter: 'data.kings.marais-moudugenou.dialogAfter',
    dialogDefeat: 'data.kings.marais-moudugenou.dialogDefeat',
    reward: getZoneMaxLevel('marais-moudugenou'),
    shlagemons: [
      orchibre.id,
      barbeBizarre.id,
      glandignon.id,
      rapasdepisse.id,
    ],
  },
  'forteresse-petmoalfiak': {
    id: 'king-forteresse-petmoalfiak',
    reward: getZoneMaxLevel('forteresse-petmoalfiak'),
    character: charlesManoir,
    dialogBefore: 'data.kings.forteresse-petmoalfiak.dialogBefore',
    dialogAfter: 'data.kings.forteresse-petmoalfiak.dialogAfter',
    dialogDefeat: 'data.kings.forteresse-petmoalfiak.dialogDefeat',
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
    dialogBefore: 'data.kings.route-du-nawak.dialogBefore',
    dialogAfter: 'data.kings.route-du-nawak.dialogAfter',
    dialogDefeat: 'data.kings.route-du-nawak.dialogDefeat',
    reward: getZoneMaxLevel('route-du-nawak'),
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
    dialogBefore: 'data.kings.mont-dracatombe.dialogBefore',
    dialogAfter: 'data.kings.mont-dracatombe.dialogAfter',
    dialogDefeat: 'data.kings.mont-dracatombe.dialogDefeat',
    reward: getZoneMaxLevel('mont-dracatombe'),
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
    dialogBefore: 'data.kings.catacombes-merdifientes.dialogBefore',
    dialogAfter: 'data.kings.catacombes-merdifientes.dialogAfter',
    dialogDefeat: 'data.kings.catacombes-merdifientes.dialogDefeat',
    reward: getZoneMaxLevel('catacombes-merdifientes'),
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
    dialogBefore: 'data.kings.route-aguicheuse.dialogBefore',
    dialogAfter: 'data.kings.route-aguicheuse.dialogAfter',
    dialogDefeat: 'data.kings.route-aguicheuse.dialogDefeat',
    reward: getZoneMaxLevel('route-aguicheuse'),
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
    dialogBefore: 'data.kings.vallee-des-chieurs.dialogBefore',
    dialogAfter: 'data.kings.vallee-des-chieurs.dialogAfter',
    dialogDefeat: 'data.kings.vallee-des-chieurs.dialogDefeat',
    reward: getZoneMaxLevel('vallee-des-chieurs'),
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
    dialogBefore: 'data.kings.trou-du-bide.dialogBefore',
    dialogAfter: 'data.kings.trou-du-bide.dialogAfter',
    dialogDefeat: 'data.kings.trou-du-bide.dialogDefeat',
    reward: getZoneMaxLevel('trou-du-bide'),
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
    dialogBefore: 'data.kings.zone-giga-zob.dialogBefore',
    dialogAfter: 'data.kings.zone-giga-zob.dialogAfter',
    dialogDefeat: 'data.kings.zone-giga-zob.dialogDefeat',
    reward: getZoneMaxLevel('zone-giga-zob'),
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
    dialogBefore: 'data.kings.route-so-dom.dialogBefore',
    dialogAfter: 'data.kings.route-so-dom.dialogAfter',
    dialogDefeat: 'data.kings.route-so-dom.dialogDefeat',
    reward: getZoneMaxLevel('route-so-dom'),
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
    dialogBefore: 'data.kings.lac-aux-relous.dialogBefore',
    dialogAfter: 'data.kings.lac-aux-relous.dialogAfter',
    dialogDefeat: 'data.kings.lac-aux-relous.dialogDefeat',
    reward: getZoneMaxLevel('lac-aux-relous'),
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
    dialogBefore: 'data.kings.canyon-a-la-derp.dialogBefore',
    dialogAfter: 'data.kings.canyon-a-la-derp.dialogAfter',
    dialogDefeat: 'data.kings.canyon-a-la-derp.dialogDefeat',
    reward: getZoneMaxLevel('canyon-a-la-derp'),
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
    dialogBefore: 'data.kings.cratere-des-legends.dialogBefore',
    dialogAfter: 'data.kings.cratere-des-legends.dialogAfter',
    dialogDefeat: 'data.kings.cratere-des-legends.dialogDefeat',
    reward: getZoneMaxLevel('cratere-des-legends'),
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
    dialogBefore: 'data.kings.mont-kouillasse.dialogBefore',
    dialogAfter: 'data.kings.mont-kouillasse.dialogAfter',
    dialogDefeat: 'data.kings.mont-kouillasse.dialogDefeat',
    reward: getZoneMaxLevel('mont-kouillasse'),
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
    dialogBefore: 'data.kings.paturage-crado.dialogBefore',
    dialogAfter: 'data.kings.paturage-crado.dialogAfter',
    dialogDefeat: 'data.kings.paturage-crado.dialogDefeat',
    reward: getZoneMaxLevel('paturage-crado'),
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
