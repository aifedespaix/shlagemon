import type { BaseShlagemon } from '~/type'
import type { Position, SavageZoneId, Zone } from '~/type/zone'
import { villageZones } from './zones/villages'

interface SavageZoneDescription {
  id: SavageZoneId
  position?: Position
  name: string
  lvl: number
  actions?: { id: string, label: string }[]
  shlagemons?: Record<string, { default: BaseShlagemon }>
  completionAchievement?: string
}

// Liste ordonnée de descriptions de zones, une par palier de 5 niveaux
const lvlsByZone = 5
let zoneIndex = 1
const savagesZonesDescription: SavageZoneDescription[] = [
  {
    id: 'plaine-kekette',
    position: { lat: 80, lng: -10 },
    lvl: zoneIndex++ * lvlsByZone,
    name: 'Plaine Kékette',
    completionAchievement: 'Fendeur de la Plaine Kékette',
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/01-05/*.ts`, { eager: true }),
  },
  {
    id: 'bois-de-bouffon',
    position: { lat: 76.51140248231867, lng: 28.110010128163253 },
    lvl: zoneIndex++ * lvlsByZone,
    name: 'Bois des Bouffons',
    completionAchievement: 'Bûcheron du Bois de Bouffon',
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/05-10/*.ts`, { eager: true }),
  },
  {
    id: 'chemin-du-slip',
    lvl: zoneIndex++ * lvlsByZone,
    name: 'Chemin du Slip',
    position: { lat: 65.66660285285928, lng: 56.819827853598014 },
    completionAchievement: 'Explorateur de la Grotte du Slip',
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/10-15/*.ts`, { eager: true }),
  },
  {
    id: 'ravin-fesse-molle',
    lvl: zoneIndex++ * lvlsByZone,
    name: 'Ravin de la Fesse Molle',
    position: { lat: 62.76491912684052, lng: 5.573356079404462 },
    completionAchievement: 'Sauveur du Ravin de la Fesse Molle',
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/15-20/*.ts`, { eager: true }),
  },
  {
    id: 'precipice-nanard',
    lvl: zoneIndex++ * lvlsByZone,
    name: 'Précipice du Vieux Nanard',
    actions: [],
    position: { lat: 70.31491594472914, lng: -43.41598781817605 },
    completionAchievement: 'Dénicheur du Vieux Nanard',
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/20-25/*.ts`, { eager: true }),
  },
  {
    id: 'marais-moudugenou',
    lvl: zoneIndex++ * lvlsByZone,
    name: 'Marais Moudugenou',
    position: { lat: 59.60569920185441, lng: -66.37334250930522 },
    completionAchievement: 'Épurateur du Marais Moudugenou',
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/25-30/*.ts`, { eager: true }),
  },
  {
    id: 'forteresse-petmoalfiak',
    lvl: zoneIndex++ * lvlsByZone,
    name: 'Forteresse Pètmoalfiak',
    position: { lat: 62.91876900690104, lng: -117.7983870967742 },
    actions: [],
    completionAchievement: 'Conquérant de la Forteresse Pètmoalfiak',
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/30-35/*.ts`, { eager: true }),
  },
  {
    id: 'route-du-nawak',
    lvl: zoneIndex++ * lvlsByZone,
    name: 'Route du Nawak',
    position: { lat: 49.27840457342957, lng: -150.65909972084367 },
    completionAchievement: 'Voyageur de la Route du Nawak',
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/35-40/*.ts`, { eager: true }),
  },
  {
    id: 'mont-dracatombe',
    lvl: zoneIndex++ * lvlsByZone,
    name: 'Mont Cul',
    position: { lat: 37.17512580969415, lng: -103.22171603598018 },
    actions: [],
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/40-45/*.ts`, { eager: true }),
  },
  {
    id: 'catacombes-merdifientes',
    lvl: zoneIndex++ * lvlsByZone,
    position: { lat: 40.16387728802661, lng: -51.83120632053309 },
    name: 'Catacombes Merdifientes',
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/45-50/*.ts`, { eager: true }),
    actions: [],
  },
  {
    id: 'route-aguicheuse',
    lvl: zoneIndex++ * lvlsByZone,
    name: 'Route Aguicheuse',
    position: { lat: 14.449697402363375, lng: -64.31153678421705 },
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/50-55/*.ts`, { eager: true }),
  },
  {
    id: 'vallee-des-chieurs',
    lvl: zoneIndex++ * lvlsByZone,
    position: { lat: 23.430970482637584, lng: -124.31523883230909 },
    name: 'Vallée des Chieurs',
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/55-60/*.ts`, { eager: true }),
  },
  {
    id: 'trou-du-bide',
    lvl: zoneIndex++ * lvlsByZone,
    position: { lat: -2.6241509975089934, lng: -92.6800752171216 },
    name: 'Trou du Bide',
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/60-65/*.ts`, { eager: true }),
  },
  {
    id: 'lac-aux-relous',
    lvl: zoneIndex++ * lvlsByZone,
position: {lat: 0.03320602577323381, lng:-131.87589174937966},
    name: 'Lac aux Relous',
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/65-70/*.ts`, { eager: true }),
  },
  {
    id: 'zone-giga-zob',
    lvl: zoneIndex++ * lvlsByZone,
    position: { lat: -28.907548890595773, lng: -103.39741004962782 },
    name: 'Aire du Giga Zob',
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/70-75/*.ts`, { eager: true }),
  },
  {
    id: 'route-so-dom',
    lvl: zoneIndex++ * lvlsByZone,
    position: { lat: -37.703417971080256, lng: -69.30657762096776 },
    name: `Route So'Dom`,
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/75-80/*.ts`, { eager: true }),
  },
  {
    id: 'mont-kouillasse',
    lvl: zoneIndex++ * lvlsByZone,
    position: { lat: -16.792819357295993, lng: -80.55090725806453 },
    name: 'Mont Kouillasse',
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/80-85/*.ts`, { eager: true }),
  },
  {
    id: 'paturage-crado',
    lvl: zoneIndex++ * lvlsByZone,
    position: { lat: -27.443103072062925, lng: -40.08974795747376 },
    name: 'Pâturage Crado',
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/85-90/*.ts`, { eager: true }),
  },
  {
    id: 'canyon-a-la-derp',
    lvl: zoneIndex++ * lvlsByZone,
    position: { lat: -56.550812451733655, lng: -58.05500736662531 },
    name: 'Canyon à la Derp',
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/90-95/*.ts`, { eager: true }),
  },
  {
    id: 'cratere-des-legends',
    lvl: zoneIndex++ * lvlsByZone,
    position: { lat: -78.57025813012717, lng: -58.52758422787182 },
    name: 'Cratère des Légends',
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/95-100/*.ts`, { eager: true }),
  },
]

const lvlMax = 100
if (savagesZonesDescription.length < lvlMax / lvlsByZone) {
  console.warn(`There is ${savagesZonesDescription.length} zones in the list, it should be ${100 / 5}}`)
}
const savageZones: Zone[] = savagesZonesDescription.map((desc, _index) => ({
  id: desc.id,
  name: desc.name,
  position: desc.position,
  type: 'sauvage',
  actions: desc.actions ?? [],
  shlagemons: Object.entries(desc.shlagemons ?? {})
    .filter(([path]) => !path.endsWith('index.ts'))
    .map(([, m]) => m.default),
  minLevel: desc.lvl - 5 || 1,
  maxLevel: desc.lvl || 1,
}))

const grotteZones: Zone[] = [

]

// Résultat final
export const zonesData: Zone[] = [
  ...villageZones,
  ...savageZones,
  ...grotteZones,
].sort((a, b) => a.minLevel - b.minLevel)
