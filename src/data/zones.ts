import type { BaseShlagemon } from '~/type'
import type { FightZoneId, Zone, ZoneType } from '~/type/zone'
import { abraquemar, alaouakbar, bulgrosboule, canarchichon, carapouffe, dartagnan, goubite, mewteub, nosferachid, pikachiant, ptitocard, qulbudrogue, rouxPasCool, sacdepates, salamiches } from './shlagemons'

interface ZoneDescription {
  id: FightZoneId
  name: string
  type: ZoneType
  actions?: { id: string, label: string }[]
  shlagemons: BaseShlagemon[]
}

// Liste ordonnée de descriptions de zones, une par palier de 5 niveaux
const zoneDescriptions: ZoneDescription[] = [
  { id: 'plaine-kekette', name: 'Plaine Kékette', type: 'sauvage', shlagemons: [
    sacdepates,
    rouxPasCool,
    canarchichon,
  ] },
  { id: 'bois-de-bouffon', name: 'Bois de Bouffon', type: 'sauvage', shlagemons: [
    dartagnan,
    ptitocard,
    goubite,
  ] },
  { id: 'grotte-du-slip', name: 'Grotte du Slip', type: 'sauvage', shlagemons: [
    nosferachid,
    alaouakbar,
    abraquemar,
  ], actions: [{ id: 'explore', label: 'Explorer la Grotte' }] },
  { id: 'ravin-fesse-molle', name: 'Ravin de la Fesse Molle', type: 'sauvage', shlagemons: [
    qulbudrogue,
    pikachiant,
    goubite,
  ] },
  { id: 'grotte-nanard', name: 'Grotte du Vieux Nanard', type: 'sauvage', actions: [{ id: 'explore', label: 'Explorer la Grotte' }], shlagemons: [
    carapouffe,
    sacdepates,
    ptitocard,
  ] },
  { id: 'marais-moudugenou', name: 'Marais Moudugenou', type: 'sauvage', shlagemons: [
    salamiches,
    nosferachid,
    rouxPasCool,
  ] },
  { id: 'forteresse-petmoalfiak', name: 'Forteresse Pètmoalfiak', type: 'sauvage', actions: [{ id: 'explore', label: 'Explorer la Forteresse' }], shlagemons: [
    bulgrosboule,
    alaouakbar,
    canarchichon,
  ] },
  { id: 'route-du-nawak', name: 'Route du Nawak', type: 'sauvage', shlagemons: [
    mewteub,
    pikachiant,
    salamiches,
  ] },
  { id: 'mont-dracatombe', name: 'Mont Cul', type: 'grotte', actions: [{ id: 'explore', label: 'Gravir le Mont' }], shlagemons: [] },
  { id: 'catacombes-merdifientes', name: 'Catacombes Merdifientes', type: 'grotte', shlagemons: [], actions: [{ id: 'explore', label: 'Fouiller les Catacombes' }] },
  { id: 'route-aguicheuse', name: 'Route Aguicheuse', type: 'sauvage', shlagemons: [] },
  { id: 'grotte-des-chieurs', name: 'Grotte des Chieurs', type: 'grotte', shlagemons: [], actions: [{ id: 'explore', label: 'Explorer la Grotte' }] },
  { id: 'trou-du-bide', name: 'Trou du Bide', type: 'sauvage', shlagemons: [] },
]

// Génération automatique des paliers 1 → 79
const generatedZones: Zone[] = zoneDescriptions.map((desc, index) => ({
  id: desc.id,
  name: desc.name,
  type: desc.type,
  actions: desc.actions ?? [],
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
  },
  {
    id: 'route-so-dom',
    name: 'Route So d\'Ôme',
    type: 'grotte',
    actions: [],
    minLevel: 91,
    maxLevel: 100,
  },
  {
    id: 'village-paume',
    name: 'Village Paumé',
    type: 'village',
    actions: [{ id: 'shop', label: 'Entrer le Shop' }],
    minLevel: 0,
    maxLevel: 0,
  },
  { id: 'village-caca-boudin', name: 'Village Caca-Boudin', type: 'village', actions: [{ id: 'shop', label: 'Entrer le Shop' }], minLevel: 75, maxLevel: 0 },
  { id: 'village-veaux-du-gland', name: 'Veaux du Gland sur Marne', type: 'village', actions: [{ id: 'shop', label: 'Entrer le Shop' }], minLevel: 25, maxLevel: 0 },
  { id: 'village-boule', name: 'Village Sux-Mais-Bouls', type: 'village', actions: [{ id: 'shop', label: 'Entrer le Shop' }], minLevel: 50, maxLevel: 0 },
]

// Résultat final
export const zonesData: Zone[] = [
  ...zonesSpeciales.filter(z => z.minLevel === 0),
  ...generatedZones,
  ...zonesSpeciales.filter(z => z.minLevel > 0),
]
