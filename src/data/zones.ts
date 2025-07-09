import type { BaseShlagemon } from '~/type'
import type { SavageZoneId, Zone } from '~/type/zone'
import { villageZones } from './zones/villages'

interface SavageZoneDescription {
  id: SavageZoneId
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
    lvl: zoneIndex++ * lvlsByZone,
    name: 'Plaine Kékette',
    completionAchievement: 'Fendeur de la Plaine Kékette',
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/01-05/*.ts`, { eager: true }),
  },
  {
    id: 'bois-de-bouffon',
    lvl: zoneIndex++ * lvlsByZone,
    name: 'Bois des Bouffons',
    completionAchievement: 'Bûcheron du Bois de Bouffon',
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/05-10/*.ts`, { eager: true }),
  },
  {
    id: 'chemin-du-slip',
    lvl: zoneIndex++ * lvlsByZone,
    name: 'Chemin du Slip',
    completionAchievement: 'Explorateur de la Grotte du Slip',
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/10-15/*.ts`, { eager: true }),
  },
  {
    id: 'ravin-fesse-molle',
    lvl: zoneIndex++ * lvlsByZone,
    name: 'Ravin de la Fesse Molle',
    completionAchievement: 'Sauveur du Ravin de la Fesse Molle',
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/15-20/*.ts`, { eager: true }),
  },
  {
    id: 'precipice-nanard',
    lvl: zoneIndex++ * lvlsByZone,
    name: 'Précipice du Vieux Nanard',
    actions: [],
    completionAchievement: 'Dénicheur du Vieux Nanard',
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/20-25/*.ts`, { eager: true }),
  },
  {
    id: 'marais-moudugenou',
    lvl: zoneIndex++ * lvlsByZone,
    name: 'Marais Moudugenou',
    completionAchievement: 'Épurateur du Marais Moudugenou',
    shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/25-30/*.ts`, { eager: true }),
  }, // 30
  // { id: 'forteresse-petmoalfiak', lvl: zoneIndex++ * lvlsByZone, name: 'Forteresse Pètmoalfiak', actions: [], completionAchievement: 'Conquérant de la Forteresse Pètmoalfiak', shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/30-35/*.ts`, { eager: true }) }}, // 35
  // { id: 'route-du-nawak', lvl: zoneIndex++ * lvlsByZone, name: 'Route du Nawak', completionAchievement: 'Voyageur de la Route du Nawak', shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/35-40/*.ts`, { eager: true }) }},
  // { id: 'mont-dracatombe', lvl: zoneIndex++ * lvlsByZone, name: 'Mont Cul', actions: [], shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/40-45/*.ts`, { eager: true }) } },
  // { id: 'catacombes-merdifientes', lvl: zoneIndex++ * lvlsByZone, name: 'Catacombes Merdifientes', shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/45-50/*.ts`, { eager: true }) } actions: [] },
  // { id: 'route-aguicheuse', lvl: zoneIndex++ * lvlsByZone, name: 'Route Aguicheuse', shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/50-55/*.ts`, { eager: true }) } },
  // { id: 'vallee-des-chieurs', lvl: zoneIndex++ * lvlsByZone, name: 'Vallée des Chieurs', shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/55-60/*.ts`, { eager: true }) } actions: [] },
  // { id: 'trou-du-bide', lvl: zoneIndex++ * lvlsByZone, name: 'Trou du Bide', shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/65-70/*.ts`, { eager: true }) } },
  // { id: 'zone-giga-zob', lvl: zoneIndex++ * lvlsByZone, name: 'Aire du Giga Zob', shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/70-75/*.ts`, { eager: true }) } },
  // { id: 'route-so-dom', lvl: zoneIndex++ * lvlsByZone, name: `Route So'Dom`, shlagemons: import.meta.glob<{ default: BaseShlagemon }>(`./shlagemons/75-80/*.ts`, { eager: true }) } },
]

const lvlMax = 100
if (savagesZonesDescription.length < lvlMax / lvlsByZone) {
  console.warn(`There is ${savagesZonesDescription.length} zones in the list, it should be ${100 / 5}}`)
}
const savageZones: Zone[] = savagesZonesDescription.map((desc, _index) => ({
  id: desc.id,
  name: desc.name,
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
