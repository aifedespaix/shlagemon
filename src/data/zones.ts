import type { BaseShlagemon } from '~/type'
import type { FightZoneId, Zone, ZoneType } from '~/type/zone'
import { abraquemar } from './shlagemons/abraquemar'
import { alakalbar } from './shlagemons/alakalbar'
import { bulgrosboule } from './shlagemons/bulgrosboule'
import { canarchichon } from './shlagemons/canarchichon'
import { carapouffe } from './shlagemons/carapouffe'
import { dartagnan } from './shlagemons/dartagnan'
import { emboli } from './shlagemons/emboli'
import { goubite } from './shlagemons/goubite'
import { metamorve } from './shlagemons/metamorve'
import { mewteub } from './shlagemons/mewteub'
import { nanmeouesh } from './shlagemons/nameouesh'
import { nosferachid } from './shlagemons/nosferachid'
import { pikachiant } from './shlagemons/pikachiant'
import { ptitocard } from './shlagemons/ptitocard'
import { qulbudrogue } from './shlagemons/qulbudrogue'
import { ricardnin } from './shlagemons/ricardnin'
import { rouxPasCool } from './shlagemons/rouxPasCool'
import { sacdepates } from './shlagemons/sacdepates'
import { salamiches } from './shlagemons/salamiches'
import { sperectum } from './shlagemons/sperectum'

interface ZoneDescription {
  id: FightZoneId
  name: string
  type: ZoneType
  actions?: { id: string, label: string }[]
  shlagemons: BaseShlagemon[]
  completionAchievement?: string
}

// Liste ordonnée de descriptions de zones, une par palier de 5 niveaux
const zoneDescriptions: ZoneDescription[] = [
  { id: 'plaine-kekette', name: 'Plaine Kékette', type: 'sauvage', completionAchievement: 'Fendeur de la Plaine Kékette', shlagemons: [
    sacdepates,
    rouxPasCool,
    canarchichon,
    sperectum,
  ] },
  { id: 'bois-de-bouffon', name: 'Bois de Bouffon', type: 'sauvage', completionAchievement: 'Bûcheron du Bois de Bouffon', shlagemons: [
    dartagnan,
    ptitocard,
    goubite,
    metamorve,
  ] },
  { id: 'grotte-du-slip', name: 'Grotte du Slip', type: 'sauvage', completionAchievement: 'Explorateur de la Grotte du Slip', shlagemons: [
    nosferachid,
    alakalbar,
    abraquemar,
    emboli,
  ] },
  { id: 'ravin-fesse-molle', name: 'Ravin de la Fesse Molle', type: 'sauvage', completionAchievement: 'Sauveur du Ravin de la Fesse Molle', shlagemons: [
    qulbudrogue,
    pikachiant,
    goubite,
    nanmeouesh,
  ] },
  { id: 'grotte-nanard', name: 'Grotte du Vieux Nanard', type: 'sauvage', actions: [], completionAchievement: 'Dénicheur du Vieux Nanard', shlagemons: [
    carapouffe,
    sacdepates,
    ptitocard,
    ricardnin,
  ] },
  { id: 'marais-moudugenou', name: 'Marais Moudugenou', type: 'sauvage', completionAchievement: 'Épurateur du Marais Moudugenou', shlagemons: [
    salamiches,
    nosferachid,
    rouxPasCool,
  ] },
  { id: 'forteresse-petmoalfiak', name: 'Forteresse Pètmoalfiak', type: 'sauvage', actions: [], completionAchievement: 'Conquérant de la Forteresse Pètmoalfiak', shlagemons: [
    bulgrosboule,
    alakalbar,
    canarchichon,
  ] },
  { id: 'route-du-nawak', name: 'Route du Nawak', type: 'sauvage', completionAchievement: 'Voyageur de la Route du Nawak', shlagemons: [
    mewteub,
    pikachiant,
    salamiches,
  ] },
  { id: 'mont-dracatombe', name: 'Mont Cul', type: 'grotte', actions: [], shlagemons: [] },
  { id: 'catacombes-merdifientes', name: 'Catacombes Merdifientes', type: 'grotte', shlagemons: [], actions: [] },
  { id: 'route-aguicheuse', name: 'Route Aguicheuse', type: 'sauvage', shlagemons: [] },
  { id: 'grotte-des-chieurs', name: 'Grotte des Chieurs', type: 'grotte', shlagemons: [], actions: [] },
  { id: 'trou-du-bide', name: 'Trou du Bide', type: 'sauvage', shlagemons: [] },
]

// Génération automatique des paliers 1 → 79
const generatedZones: Zone[] = zoneDescriptions.map((desc, index) => ({
  id: desc.id,
  name: desc.name,
  type: desc.type,
  actions: desc.actions ?? [],
  shlagemons: desc.shlagemons,
  minLevel: index * 5 || 1,
  maxLevel: index * 5 + 5,
}))

// Zones spéciales
const zonesSpeciales: Zone[] = [
  {
    id: 'zone-giga-zob',
    name: 'Zone Giga-Zob',
    type: 'sauvage',
    actions: [],
    minLevel: 80,
    maxLevel: 90,
    completionAchievement: 'Champion de la Zone Giga-Zob',
  },
  {
    id: 'route-so-dom',
    name: 'Route So d\'Ôme',
    type: 'grotte',
    actions: [],
    minLevel: 91,
    maxLevel: 100,
    completionAchievement: 'Héros de la Route So d\'Ôme',
  },
  {
    id: 'chambre-du-noobi',
    name: 'La Chambre du Noobi',
    type: 'village',
    image: '/zones/room.png',
    minLevel: 0,
    maxLevel: 0,
    actions: [],
  },
  {
    id: 'village-veaux-du-gland',
    name: 'Veaux du Gland sur Marne',
    type: 'village',
    actions: [
      { id: 'shop', label: 'Entrer dans le Magasin' },
      { id: 'minigame', label: 'Mini-jeu' },
    ],
    minLevel: 10,
    maxLevel: 0,
  },
  { id: 'village-boule', name: 'Village Sux-Mais-Bouls', type: 'village', actions: [{ id: 'shop', label: 'Entrer dans le Magasin' }], minLevel: 25, maxLevel: 0 },
  { id: 'village-paume', name: 'Village Caca-Boudin', type: 'village', actions: [{ id: 'shop', label: 'Entrer dans le Magasin' }], minLevel: 50, maxLevel: 0 },
]

// Résultat final
export const zonesData: Zone[] = [
  ...zonesSpeciales.filter(z => z.minLevel === 0),
  ...generatedZones,
  ...zonesSpeciales.filter(z => z.minLevel > 0),
]
