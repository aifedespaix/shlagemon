import type { Zone } from '~/type/zone'

interface ZoneDescription {
  id: string
  name: string
  type: 'village' | 'sauvage' | 'grotte'
  actions?: { id: string, label: string }[]
}

// Liste ordonnée de descriptions de zones, une par palier de 5 niveaux
const zoneDescriptions: ZoneDescription[] = [
  { id: 'plaine-kekette', name: 'Plaine Kékette', type: 'sauvage' },
  { id: 'bois-de-bouffon', name: 'Bois de Bouffon', type: 'sauvage' },
  { id: 'grotte-du-slip', name: 'Grotte du Slip', type: 'grotte', actions: [{ id: 'explore', label: 'Explorer la Grotte' }] },
  { id: 'ravin-fesse-molle', name: 'Ravin de la Fesse Molle', type: 'sauvage' },
  { id: 'grotte-nanard', name: 'Grotte du Vieux Nanard', type: 'grotte', actions: [{ id: 'explore', label: 'Explorer la Grotte' }] },
  { id: 'marais-moudugenou', name: 'Marais Moudugenou', type: 'sauvage' },
  { id: 'forteresse-petmoalfiak', name: 'Forteresse Pètmoalfiak', type: 'grotte', actions: [{ id: 'explore', label: 'Explorer la Forteresse' }] },
  { id: 'route-du-nawak', name: 'Route du Nawak', type: 'sauvage' },
  { id: 'mont-dracatombe', name: 'Mont Cul', type: 'grotte', actions: [{ id: 'explore', label: 'Gravir le Mont' }] },
  { id: 'catacombes-merdifientes', name: 'Catacombes Merdifientes', type: 'grotte', actions: [{ id: 'explore', label: 'Fouiller les Catacombes' }] },
  { id: 'route-aguicheuse', name: 'Route Aguicheuse', type: 'sauvage' },
  { id: 'grotte-des-chieurs', name: 'Grotte des Chieurs', type: 'grotte', actions: [{ id: 'explore', label: 'Explorer la Grotte' }] },
  { id: 'trou-du-bide', name: 'Trou du Bide', type: 'sauvage' },
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
