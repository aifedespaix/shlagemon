import type { BaseShlagemon } from '~/type'
import type { SavageZoneId, Zone } from '~/type/zone'
import { abraquemar } from './shlagemons/abraquemar'
import { alakalbar } from './shlagemons/alakalbar'
import aspigros from './shlagemons/aspigros'
import { bulgrosboule } from './shlagemons/bulgrosboule'
import { canarchichon } from './shlagemons/canarchichon'
import { carapouffe } from './shlagemons/carapouffe'
import chenipaon from './shlagemons/chenipaon'
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

interface SavageZoneDescription {
  id: SavageZoneId
  name: string
  actions?: { id: string, label: string }[]
  shlagemons: BaseShlagemon[]
  completionAchievement?: string
}

// Liste ordonnée de descriptions de zones, une par palier de 5 niveaux
const savagesZonesDescription: SavageZoneDescription[] = [
  { id: 'plaine-kekette', name: 'Plaine Kékette', completionAchievement: 'Fendeur de la Plaine Kékette', shlagemons: [
    sacdepates,
    rouxPasCool,
    canarchichon,
    sperectum,
  ] },
  { id: 'bois-de-bouffon', name: 'Bois des Bouffons', completionAchievement: 'Bûcheron du Bois de Bouffon', shlagemons: [
    aspigros,
    chenipaon,
    ptitocard,
    metamorve,
  ] },
  { id: 'chemin-du-slip', name: 'Chemin du Slip', completionAchievement: 'Explorateur de la Grotte du Slip', shlagemons: [
    nosferachid,
    abraquemar,
    emboli,
  ] },
  { id: 'ravin-fesse-molle', name: 'Ravin de la Fesse Molle', completionAchievement: 'Sauveur du Ravin de la Fesse Molle', shlagemons: [
    qulbudrogue,
    pikachiant,
    goubite,
    nanmeouesh,
  ] },
  { id: 'precipice-nanard', name: 'Précipice du Vieux Nanard', actions: [], completionAchievement: 'Dénicheur du Vieux Nanard', shlagemons: [
    carapouffe,
    sacdepates,
    ptitocard,
    ricardnin,
  ] },
  { id: 'marais-moudugenou', name: 'Marais Moudugenou', completionAchievement: 'Épurateur du Marais Moudugenou', shlagemons: [
    salamiches,
    nosferachid,
    rouxPasCool,
  ] },
  { id: 'forteresse-petmoalfiak', name: 'Forteresse Pètmoalfiak', actions: [], completionAchievement: 'Conquérant de la Forteresse Pètmoalfiak', shlagemons: [
    bulgrosboule,
    alakalbar,
    canarchichon,
  ] },
  { id: 'route-du-nawak', name: 'Route du Nawak', completionAchievement: 'Voyageur de la Route du Nawak', shlagemons: [
    mewteub,
    pikachiant,
    salamiches,
  ] },
  { id: 'mont-dracatombe', name: 'Mont Cul', actions: [], shlagemons: [ptitocard] },
  { id: 'catacombes-merdifientes', name: 'Catacombes Merdifientes', shlagemons: [sacdepates], actions: [] },
  { id: 'route-aguicheuse', name: 'Route Aguicheuse', shlagemons: [aspigros] },
  { id: 'vallee-des-chieurs', name: 'Vallée des Chieurs', shlagemons: [carapouffe], actions: [] },
  { id: 'trou-du-bide', name: 'Trou du Bide', shlagemons: [chenipaon] },
  { id: 'zone-giga-zob', name: 'Aire du Giga Zob', shlagemons: [goubite] },
  { id: 'route-so-dom', name: `Route So'Dom`, shlagemons: [canarchichon] },
]

const lvlsByZone = 5
const lvlMax = 100
if (savagesZonesDescription.length < lvlMax / lvlsByZone) {
  console.warn(`There is ${savagesZonesDescription.length} zones in the list, it should be ${100 / 5}}`)
}
const savageZones: Zone[] = savagesZonesDescription.map((desc, index) => ({
  id: desc.id,
  name: desc.name,
  type: 'sauvage',
  actions: desc.actions ?? [],
  shlagemons: desc.shlagemons,
  minLevel: index * lvlsByZone || 1,
  maxLevel: index * lvlsByZone + lvlsByZone,
}))

// Zones spéciales
const villageZones: Zone[] = [
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

const grotteZones: Zone[] = [

]

// Résultat final
export const zonesData: Zone[] = [
  ...villageZones,
  ...savageZones,
  ...grotteZones,
].sort((a, b) => a.minLevel - b.minLevel)
