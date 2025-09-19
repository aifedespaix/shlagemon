import type { SavageZoneId, Zone } from '~/type'
import { savage95 } from '../savages/95-cratere-des-legends'
import { village100 } from './village100'

export const laboratoryVillage: Zone = {
  id: 'laboratory',
  name: 'data.zones.villages.laboratory.name',
  type: 'village',
  villageType: 'hyper',
  position: {
    lat: -233.66616169989197,
    lng: 81.69425875753993,
  },
  map: {
    center: { lat: village100.map.center.lat, lng: village100.map.center.lng },
    min: { lat: village100.map.min.lat, lng: village100.map.min.lng },
    max: { lat: village100.map.max.lat, lng: village100.map.max.lng },
  },
  attachedTo: savage95.id as SavageZoneId,
  minLevel: 100,
  requiresLaboratoryUnlock: true,
  pois: {
    laboratory: {
      id: 'arena',
      type: 'laboratory',
      label: 'data.zones.villages.laboratory.pois.laboratory.label',
      position: {
        lat: -233.66616169989197,
        lng: 81.69425875753993,
      },
    },
  },
}
